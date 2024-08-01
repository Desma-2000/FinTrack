import secrets

# Generate a 32-byte key
key = secrets.token_hex(32)
print(key)
