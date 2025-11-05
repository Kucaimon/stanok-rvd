#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Правильное исправление: файлы в CP1251 -> UTF-8
БЕЗ двойной конвертации
"""
import os
import glob

def fix_encoding(filepath):
    """Читает файл как CP1251 и сохраняет как UTF-8"""
    try:
        # Читаем как CP1251 (Windows-1251)
        with open(filepath, 'r', encoding='cp1251', errors='ignore') as f:
            content = f.read()
        
        # Сохраняем как UTF-8 БЕЗ BOM
        with open(filepath, 'w', encoding='utf-8', newline='') as f:
            f.write(content)
        
        print(f"Исправлен: {filepath}")
        return True
    except Exception as e:
        print(f"Ошибка {filepath}: {e}")
        return False

def main():
    html_files = glob.glob('**/*.html', recursive=True)
    fixed = 0
    
    for filepath in html_files:
        if fix_encoding(filepath):
            fixed += 1
        if fixed % 20 == 0:
            print(f"Обработано: {fixed} файлов...")
    
    print(f"\nВсего исправлено: {fixed}/{len(html_files)} файлов")

if __name__ == '__main__':
    main()

