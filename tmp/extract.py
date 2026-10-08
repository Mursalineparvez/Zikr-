import re

def extract_array():
    with open('/tmp/bundle.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the pattern of the history array starting with year 570
    match = re.search(r'\[\s*\{\s*y\s*:\s*570\s*,', content)
    if not match:
        print('Could not find start of history array starting with y: 570')
        return

    start_idx = match.start()
    print('Found start of array at index:', start_idx)
    
    bracket_count = 0
    in_string = False
    quote_char = None
    escaped = False
    
    for i in range(start_idx, len(content)):
        char = content[i]
        
        if escaped:
            escaped = False
            continue
            
        if char == '\\':
            escaped = True
            continue
            
        if in_string:
            if char == quote_char:
                in_string = False
                quote_char = None
            continue
            
        if char in ["'", '"', '`']:
            in_string = True
            quote_char = char
            continue
            
        if char == '[':
            bracket_count += 1
        elif char == ']':
            bracket_count -= 1
            if bracket_count == 0:
                array_content = content[start_idx:i+1]
                print('Length of extracted array:', len(array_content))
                with open('/tmp/extracted_history.json', 'w', encoding='utf-8') as out:
                    out.write(array_content)
                print('Saved array to /tmp/extracted_history.json')
                return

if __name__ == '__main__':
    extract_array()
