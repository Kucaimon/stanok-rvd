#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Исправление кодировки всех HTML файлов и обновление текстов
"""
import os
import glob
import re

def fix_file_encoding(filepath):
    """Исправляет кодировку файла"""
    try:
        # Пробуем прочитать как UTF-8
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            # Проверяем на BOM
            if content.startswith('\ufeff'):
                content = content[1:]
            # Если есть кракозябры, пробуем CP1251
            if 'РћР' in content[:500] or 'Р"Р' in content[:500]:
                with open(filepath, 'r', encoding='cp1251', errors='ignore') as f:
                    content = f.read()
        except:
            # Если не UTF-8, пробуем CP1251
            with open(filepath, 'r', encoding='cp1251', errors='ignore') as f:
                content = f.read()
        
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
        if fix_file_encoding(filepath):
            fixed += 1
        if fixed % 20 == 0:
            print(f"Обработано: {fixed} файлов...")
    
    print(f"\nВсего исправлено: {fixed}/{len(html_files)} файлов")

if __name__ == '__main__':
    main()

