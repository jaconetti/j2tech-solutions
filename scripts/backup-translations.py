import json

# Carregar arquivo português original
with open('messages/pt-backup.json', 'w', encoding='utf-8') as f:
    with open('messages/pt.json', 'r', encoding='utf-8') as original:
        f.write(original.read())

print("Backup criado. Agora execute: python scripts/fix-translations.py")
