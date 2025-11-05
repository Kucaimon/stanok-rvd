#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Массовое исправление всех проблем: кракозябры и логотипы
"""
import os
import glob
import re

def fix_mojibake(text):
    """Исправляет кракозябры"""
    replacements = [
        (r'Р С› Р С™Р С›Р СљР СџР С'Р СњР Р ', 'О КОМПАНИИ'),
        (r'Р РЋР вЂўР В Р СћР Р В¤Р Р С™Р С'Р СћР В«', 'СЕРТИФИКАТЫ'),
        (r'Р РЋР СџР В Р С'Р вЂ™Р С›Р В§Р СњР Р С™', 'СПРАВОЧНИК'),
        (r'Р С™Р С›Р СњР СћР С'Р С™Р СћР В«', 'КОНТАКТЫ'),
        (r'Р вЂ"Р С'Р С™Р С'Р вЂ" Р РЋ Р РЋР С'Р в„ўР СћР С'', 'ЗАКАЗ С САЙТА'),
        (r'Р С›РЎвЂљР С"РЎР‚РЎвЂ№РЎвЂљРЎРЉ Р СР ВµР Р…РЎР‹', 'Открыть меню'),
        (r'Р вЂєР С•Р С–Р С•РЎвЂљР С'Р С—', 'Логотип'),
        (r'Р С—РЎР‚Р С•Р Т'РЎС"Р С"РЎвЂ Р С'Р С'РЎРЏ', 'продукция'),
        (r'Р'В»', '»'),
        (r'Р'В©', '©'),
        (r'Р вЂњР В»Р В°Р Р†Р Р…Р В°РЎРЏ', 'Главная'),
        (r'Р РЋР ВµРЎР‚РЎвЂљР С'РЎвЂћР С'Р С"Р В°РЎвЂљРЎвЂ№', 'Сертификаты'),
        (r'Р РЋР С—РЎР‚Р В°Р Р†Р С•РЎвЂЎР Р…Р С'Р С"', 'Справочник'),
        (r'Р С™Р С•Р Р…РЎвЂљР В°Р С"РЎвЂљРЎвЂ№', 'Контакты'),
        (r'Р вЂ"Р В°Р С"Р В°Р В· РЎРѓ РЎРѓР В°Р в„–РЎвЂљР В°', 'Заказ с сайта'),
    ]
    for pattern, replacement in replacements:
        text = re.sub(pattern, replacement, text)
    return text

def get_logo_path(filepath):
    """Определяет путь к логотипу в зависимости от глубины вложенности"""
    depth = filepath.replace('\\', '/').count('/') - 1
    if filepath.startswith('pages/products/'):
        if depth >= 4:
            return '../../../../images/logo.png'
        elif depth >= 3:
            return '../../../images/logo.png'
        else:
            return '../../images/logo.png'
    elif filepath.startswith('pages/'):
        return '../images/logo.png'
    else:
        return 'images/logo.png'

def add_logo_if_missing(content, logo_path):
    """Добавляет логотип если его нет"""
    # Проверяем есть ли логотип
    if 'logo-img' in content or 'logo-placeholder' in content:
        return content, False
    
    # Ищем header__main
    if '<div class="header__main">' in content:
        logo_html = f'''            <div class="logo-placeholder">
              <img src="{logo_path}" alt="Логотип" class="logo-img" />
            </div>'''
        
        # Добавляем логотип после header__main
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
        content = fix_mojibake(content)
        
        logo_path = get_logo_path(filepath)
        content, logo_added = add_logo_if_missing(content, logo_path)
        
        if content != original:
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
        if (fixed + logos_added) % 20 == 0:
            print(f"Обработано: исправлено {fixed}, логотипов добавлено {logos_added}...")
    
    print(f"\nИтоги:")
    print(f"Исправлено файлов: {fixed}")
    print(f"Добавлено логотипов: {logos_added}")

if __name__ == '__main__':
    main()

