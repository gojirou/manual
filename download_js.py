import requests

url = "https://manual-accessories.toyota/CAWeb_Data/js/supplies.js"
response = requests.get(url)
with open("supplies_full.js", "w", encoding="utf-8") as f:
    f.write(response.text)

print("Downloaded supplies_full.js")
