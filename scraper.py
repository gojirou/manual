import requests
import json
import sqlite3
import os
import time

DB_PATH = "toyota_manuals.db"
CARS_URL = "https://manual-accessories.toyota/CAWeb_Data/data/cars.json"
CAR_DATA_BASE_URL = "https://manual-accessories.toyota/CAWeb_Data/data/{car_id}.json"
PDF_BASE_URL = "https://manual-accessories.toyota/CAWeb_Data/pdf/{pdf_url}"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS manuals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            brand TEXT,
            car_id TEXT,
            car_name TEXT,
            category TEXT,
            accessory_name TEXT,
            part_number TEXT,
            file_name TEXT,
            manual_url TEXT
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS favorites (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            manual_id INTEGER UNIQUE,
            FOREIGN KEY (manual_id) REFERENCES manuals(id)
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            manual_id INTEGER,
            accessed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (manual_id) REFERENCES manuals(id)
        )
    ''')
    conn.commit()
    return conn

def fetch_data():
    conn = init_db()
    cursor = conn.cursor()
    
    print(f"Fetching cars list from {CARS_URL}")
    response = requests.get(CARS_URL, timeout=10)
    response.raise_for_status()
    # It might have BOM, so response.json() might fail. Let's handle it manually if needed.
    text = response.text
    if text.startswith('\ufeff'):
        text = text[1:]
    cars_data = json.loads(text)
    
    # Clear existing manuals to refresh
    cursor.execute('DELETE FROM manuals')
    
    total_cars = 0
    for brand, cars in cars_data.items():
        total_cars += len(cars)
        
    print(f"Found {total_cars} cars across {len(cars_data)} brands.")
    
    count = 0
    for brand, cars in cars_data.items():
        for car in cars:
            car_id = car.get("name")
            car_name = car.get("jpName")
            count += 1
            print(f"[{count}/{total_cars}] Fetching data for {car_name} ({car_id})")
            
            car_url = CAR_DATA_BASE_URL.format(car_id=car_id)
            try:
                car_response = requests.get(car_url, timeout=10)
                if car_response.status_code == 200:
                    car_text = car_response.text
                    if car_text.startswith('\ufeff'):
                        car_text = car_text[1:]
                    
                    try:
                        car_details = json.loads(car_text)
                    except json.JSONDecodeError:
                        print(f"  Failed to parse JSON for {car_id}. Skipping.")
                        continue
                    
                    for category, accessories in car_details.items():
                        if category == "subname":
                            continue # skip subname config
                            
                        for acc in accessories:
                            acc_name = acc.get("name", "")
                            versions = acc.get("versions", [])
                            for ver in versions:
                                part_number = ver.get("number", "").replace("<br>", " ")
                                files = ver.get("files", {})
                                for file_key, file_info in files.items():
                                    file_name = file_info.get("name", "")
                                    pdf_url = file_info.get("url", "")
                                    if pdf_url:
                                        full_url = PDF_BASE_URL.format(pdf_url=pdf_url)
                                        cursor.execute('''
                                            INSERT INTO manuals (brand, car_id, car_name, category, accessory_name, part_number, file_name, manual_url)
                                            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                                        ''', (brand, car_id, car_name, category, acc_name, part_number, file_name, full_url))
                else:
                    print(f"  HTTP {car_response.status_code} for {car_url}. Skipping.")
            except Exception as e:
                print(f"  Error fetching {car_id}: {e}")
            
            time.sleep(0.1) # Be nice to the server

    conn.commit()
    
    cursor.execute('SELECT COUNT(*) FROM manuals')
    manuals_count = cursor.fetchone()[0]
    print(f"Data fetching complete! Saved {manuals_count} manuals to database.")
    
    conn.close()

if __name__ == "__main__":
    fetch_data()
