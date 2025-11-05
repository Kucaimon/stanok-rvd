#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Исправление всех проблем на сайте:
1. Кракозябры
2. Логотипы
3. Ссылки
"""
import os
import glob
import re

def fix_mojibake_in_file(filepath):
    """Исправляет кракозябры в файле"""
    try:
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
        
        original_content = content
        
        # Замены известных кракозябров на правильный текст
        replacements = [
            # Навигация
            (r'Р С› Р С™Р С›Р СљР СџР С'Р СњР Р ', 'О КОМПАНИИ'),
            (r'Р РЋР вЂўР В Р СћР Р В¤Р Р С™Р С'Р СћР В«', 'СЕРТИФИКАТЫ'),
            (r'Р РЋР СџР В Р С'Р вЂ™Р С›Р В§Р СњР Р С™', 'СПРАВОЧНИК'),
            (r'Р С™Р С›Р СњР СћР С'Р С™Р СћР В«', 'КОНТАКТЫ'),
            (r'Р вЂ"Р С'Р С™Р С'Р вЂ" Р РЋ Р РЋР С'Р в„ўР СћР С'', 'ЗАКАЗ С САЙТА'),
            (r'Р С›РЎвЂљР С"РЎР‚РЎвЂ№РЎвЂљРЎРЉ Р СР ВµР Р…РЎР‹', 'Открыть меню'),
            (r'Р вЂєР С•Р С–Р С•РЎвЂљР С'Р С—', 'Логотип'),
            # UNIFLEX
            (r'Р С›Р вЂР вЂ"Р Р СљР СњР С›Р в„ў Р СџР В Р вЂўР РЋР РЋ', 'ОБЖИМНОЙ ПРЕСС'),
            (r'Р СљР С•РЎвЂ°Р Р…РЎвЂ№Р в„– Р С—РЎР‚Р ВµРЎРѓРЎРѓ', 'Многофункциональная пресс'),
            (r'Р Т'Р В»РЎРЏ Р С•Р С—РЎР‚Р ВµРЎРѓРЎРѓР С•Р Р†Р С"Р С' Р С–Р С'Р Т'РЎР‚Р В°Р Р†Р В»Р С'РЎвЂЎР ВµРЎРѓР С"Р С'РЎвЂ¦', 'для опрессовки гидравлических'),
            (r'РЎР‚РЎС"Р С"Р В°Р Р†Р С•Р Р†', 'рукавов'),
            (r'Р СљР Р…Р С•Р С–Р С•РЎвЂћРЎС"Р Р…Р С"РЎвЂ Р С'Р С•Р Р…Р В°Р В»РЎРЉР Р…Р В°РЎРЏ', 'Многофункциональная'),
            (r'Р СР В°РЎв‚¬Р С'Р Р…Р В°', 'машина'),
            (r'Р Т'Р В»РЎРЏ РЎРѓР ВµРЎР‚Р Р†Р С'РЎРѓР В°', 'для сервиса'),
            # Общие
            (r'Р С›Р В±Р С•РЎР‚РЎС"Р Т'Р С•Р Р†Р В°Р Р…Р С'Р Вµ', 'Оборудование'),
            (r'Р С›Р В±Р Р…Р С•Р Р†Р В»Р ВµР Р…Р С•', 'Обновлено'),
            (r'Р С—РЎР‚Р С•Р Т'РЎС"Р С"РЎвЂ Р С'Р С'РЎРЏ', 'Продукция'),
        ]
        
        for pattern, replacement in replacements:
            content = re.sub(pattern, replacement, content)
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8', newline='') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Ошибка {filepath}: {e}")
        return False

def add_logo_if_missing(filepath):
    """Добавляет логотип если его нет"""
    try:
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
        
        # Проверяем есть ли логотип
        if 'logo-img' not in content or 'logo-placeholder' not in content:
            # Определяем путь к логотипу в зависимости от глубины вложенности
            depth = filepath.count(os.sep) - filepath.replace('pages', '').count(os.sep)
            if 'pages' in filepath:
                if filepath.startswith('pages/products/'):
                    logo_path = '../../images/logo.png'
                elif 'products' in filepath and filepath.count('/') > 2:
                    logo_path = '../../../images/logo.png'
                elif 'products' in filepath and filepath.count('/') > 3:
                    logo_path = '../../../../images/logo.png'
                else:
                    logo_path = '../images/logo.png'
            else:
                logo_path = 'images/logo.png'
            
            # Ищем header__main
            if '<div class="header__main">' in content:
                logo_html = f'''            <div class="logo-placeholder">
              <img src="{logo_path}" alt="Логотип" class="logo-img" />
            </div>'''
                
                # Добавляем логотип после header__main и перед закрывающим div
                content = content.replace(
                    '<div class="header__main">',
                    f'<div class="header__main">\n          <div class="logo-section">\n{logo_html}\n          </div>'
                )
                
                with open(filepath, 'w', encoding='utf-8', newline='') as f:
                    f.write(content)
                return True
        return False
    except Exception as e:
        print(f"Ошибка {filepath}: {e}")
        return False

def main():
    html_files = glob.glob('**/*.html', recursive=True)
    
    mojibake_fixed = 0
    logos_added = 0
    
    print("Исправление кракозябров и добавление логотипов...")
    for filepath in sorted(html_files):
        if fix_mojibake_in_file(filepath):
            mojibake_fixed += 1
        if add_logo_if_missing(filepath):
            logos_added += 1
    
    print(f"Исправлено кракозябр: {mojibake_fixed}")
    print(f"Добавлено логотипов: {logos_added}")

if __name__ == '__main__':
    main()

