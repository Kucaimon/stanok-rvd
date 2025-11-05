#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Гарантированно сохраняет все HTML файлы в UTF-8
"""
import os
import glob

def ensure_utf8(filepath):
    """Читает файл и сохраняет в UTF-8"""
    try:
        # Пробуем разные кодировки
        content = None
        encodings = ['utf-8', 'cp1251', 'cp866', 'latin-1']
        
        for enc in encodings:
            try:
                with open(filepath, 'r', encoding=enc, errors='replace') as f:
                    content = f.read()
                # Удаляем BOM если есть
                if content.startswith('\ufeff'):
                    content = content[1:]
                break
            except:
                continue
        
        if content is None:
            print(f"Не удалось прочитать: {filepath}")
            return False
        
        # Сохраняем как UTF-8 БЕЗ BOM
        with open(filepath, 'w', encoding='utf-8', newline='') as f:
            f.write(content)
        
        return True
    except Exception as e:
        print(f"Ошибка {filepath}: {e}")
        return False

def main():
    html_files = glob.glob('**/*.html', recursive=True)
    fixed = 0
    
    for filepath in html_files:
        if ensure_utf8(filepath):
            fixed += 1
        if fixed % 20 == 0:
            print(f"Обработано: {fixed} файлов...")
    
    print(f"\nВсего обработано: {fixed}/{len(html_files)} файлов")

if __name__ == '__main__':
    main()

