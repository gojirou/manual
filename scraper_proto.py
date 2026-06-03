import requests
from bs4 import BeautifulSoup
import json
import os

BASE_URL = "https://manual-accessories.toyota/CAWeb/"
START_URL = f"{BASE_URL}index.html"

def fetch_and_parse(url):
    print(f"Fetching: {url}")
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        # The site might be encoded in Shift_JIS or UTF-8, let's use apparent_encoding or utf-8
        response.encoding = response.apparent_encoding
        return BeautifulSoup(response.text, 'html.parser')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def analyze_site():
    print("Starting analysis...")
    soup = fetch_and_parse(START_URL)
    if not soup:
        print("Failed to fetch start URL.")
        return

    # Find the "一般用品取付要領書" link
    # Usually it's in a menu or list. Since it's dynamic we might need to look at index.js or find a specific structure.
    # Let's just output all links first to see the structure.
    print("--- All Links on Start Page ---")
    links = soup.find_all('a')
    for a in links:
        href = a.get('href', '')
        text = a.get_text(strip=True)
        print(f"Text: '{text}', Href: '{href}'")

    print("\nSince the menu might be loaded dynamically (menu-loader.js is in HTML), we might need to fetch the menu directly or use selenium. But let's check if we can find the data files.")

if __name__ == "__main__":
    analyze_site()
