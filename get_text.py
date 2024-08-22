import easyocr

reader = easyocr.Reader(['en'])

def read_text(image_path):
    result = reader.readtext(image_path, detail = 0, allowlist='0123456789')
    total_text = ''

    for i in range(len(result)):
        total_text += result[i]

    return total_text
