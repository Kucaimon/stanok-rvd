#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Массовое исправление кракозябр и добавление логотипов
"""
import os
import glob
import re

def fix_mojibake(text):
    """Исправляет кракозябры используя байтовые замены"""
    # Используем байтовые паттерны для избежания проблем с кодировкой
    replacements = [
        (b'\xd0\x9e \xd0\x9a\xd0\x9e\xd0\x9c\xd0\x9f\xd0\x90\xd0\x9d\xd0\x98\xd0\x98', 'О КОМПАНИИ'.encode('utf-8')),
        (b'\xd0\xa1\xd0\x95\xd0\xa0\xd0\xa2\xd0\x98\xd0\xa4\xd0\x98\xd0\x9a\xd0\x90\xd0\xa2\xd0\xab', 'СЕРТИФИКАТЫ'.encode('utf-8')),
        (b'\xd0\xa1\xd0\x9f\xd0\xa0\xd0\x90\xd0\x92\xd0\x9e\xd0\xa7\xd0\x9d\xd0\x98\xd0\x9a', 'СПРАВОЧНИК'.encode('utf-8')),
        (b'\xd0\x9a\xd0\x9e\xd0\x9d\xd0\xa2\xd0\x90\xd0\x9a\xd0\xa2\xd0\xab', 'КОНТАКТЫ'.encode('utf-8')),
        (b'\xd0\x97\xd0\x90\xd0\x9a\xd0\x90\xd0\x97 \xd0\xa1 \xd0\xa1\xd0\x90\xd0\x99\xd0\xa2\xd0\x90', 'ЗАКАЗ С САЙТА'.encode('utf-8')),
        (b'\xd0\x9e\xd1\x82\xd0\xba\xd1\x80\xd1\x8b\xd1\x82\xd1\x8c \xd0\xbc\xd0\xb5\xd0\xbd\xd1\x8e', 'Открыть меню'.encode('utf-8')),
        (b'\xd0\x9b\xd0\xbe\xd0\xb3\xd0\xbe\xd1\x82\xd0\xb8\xd0\xbf', 'Логотип'.encode('utf-8')),
        (b'\xd0\x9f\xd1\x80\xd0\xbe\xd0\xb4\xd1\x83\xd0\xba\xd1\x86\xd0\xb8\xd1\x8f', 'продукция'.encode('utf-8')),
        (b'\xd0\x93\xd0\xbb\xd0\xb0\xd0\xb2\xd0\xbd\xd0\xb0\xd1\x8f', 'Главная'.encode('utf-8')),
        (b'\xd0\xa1\xd0\xb5\xd1\x80\xd1\x82\xd0\xb8\xd1\x84\xd0\xb8\xd0\xba\xd0\xb0\xd1\x82\xd1\x8b', 'Сертификаты'.encode('utf-8')),
        (b'\xd0\xa1\xd0\xbf\xd1\x80\xd0\xb0\xd0\xb2\xd0\xbe\xd1\x87\xd0\xbd\xd0\xb8\xd0\xba', 'Справочник'.encode('utf-8')),
        (b'\xd0\x9a\xd0\xbe\xd0\xbd\xd1\x82\xd0\xb0\xd0\xba\xd1\x82\xd1\x8b', 'Контакты'.encode('utf-8')),
        (b'\xd0\x97\xd0\xb0\xd0\xba\xd0\xb0\xd0\xb7 \xd1\x81 \xd1\x81\xd0\xb0\xd0\xb9\xd1\x82\xd0\xb0', 'Заказ с сайта'.encode('utf-8')),
    ]
    
    # Работаем с байтами
    try:
        text_bytes = text.encode('utf-8')
        for pattern, replacement in replacements:
            text_bytes = text_bytes.replace(pattern, replacement)
        return text_bytes.decode('utf-8')
    except:
        return text

def get_logo_path(filepath):
    """Определяет путь к логотипу"""
    filepath_normalized = filepath.replace('\\', '/')
    if filepath_normalized.startswith('pages/products/'):
        depth = filepath_normalized.count('/') - 2
        if depth >= 4:
            return '../../../../images/logo.png'
        elif depth >= 3:
            return '../../../images/logo.png'
        else:
            return '../../images/logo.png'
    elif filepath_normalized.startswith('pages/'):
        return '../images/logo.png'
    else:
        return 'images/logo.png'

def add_logo_if_missing(content, logo_path):
    """Добавляет логотип если его нет"""
    if 'logo-img' in content or 'logo-placeholder' in content:
        return content, False
    
    if '<div class="header__main">' in content:
        logo_html = f'''            <div class="logo-placeholder">
              <img src="{logo_path}" alt="Логотип" class="logo-img" />
            </div>'''
        
        content = content.replace(
            '<div class="header__main">',
            f'<div class="header__main">\n          <div class="logo-section">\n{logo_html}\n          </div>',
            1
        )
        return content, True
    return content, False

def fix_file(filepath):
    """Исправляет файл"""
    try:
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
        
        original = content
        
        # Исправляем кракозябры
        content = fix_mojibake(content)
        
        # Добавляем логотип
        logo_path = get_logo_path(filepath)
        content, logo_added = add_logo_if_missing(content, logo_path)
        
        if content != original or logo_added:
            with open(filepath, 'w', encoding='utf-8', newline='') as f:
                f.write(content)
            return True, logo_added
        return False, False
    except Exception as e:
        print(f"Ошибка {filepath}: {e}")
        return False, False

def main():
    html_files = glob.glob('**/*.html', recursive=True)
    
    fixed = 0
    logos_added = 0
    
    print("Исправление кракозябр и добавление логотипов...")
    for filepath in sorted(html_files):
        changed, logo_added = fix_file(filepath)
        if changed:
            fixed += 1
        if logo_added:
            logos_added += 1
        if (fixed + logos_added) % 50 == 0:
            print(f"Обработано: исправлено {fixed}, логотипов добавлено {logos_added}...")
    
    print(f"\nИтоги:")
    print(f"Исправлено файлов: {fixed}")
    print(f"Добавлено логотипов: {logos_added}")

if __name__ == '__main__':
    main()

