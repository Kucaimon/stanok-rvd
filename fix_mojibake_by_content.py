#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Исправление кракозябров путем замены известных паттернов на правильный текст
"""
import os
import glob
import re

def fix_mojibake_content(content):
    """Исправляет кракозябры заменой известных паттернов"""
    
    # Словарь замен для типичных кракозябров
    replacements = [
        # UNIFLEX S6
        (r'Р С›Р вЂР вЂ"Р Р СљР СњР С›Р в„ў Р СџР В Р вЂўР РЋР РЋ UNIFLEX S6', 'ОБЖИМНОЙ ПРЕСС UNIFLEX S6'),
        (r'Р С›Р вЂР вЂ"Р Р СљР СњР С›Р в„ў', 'ОБЖИМНОЙ'),
        (r'Р СџР В Р вЂўР РЋР РЋ', 'ПРЕСС'),
        (r'Р СљР С•РЎвЂ°Р Р…РЎвЂ№Р в„– Р С—РЎР‚Р ВµРЎРѓРЎРѓ', 'Многофункциональная пресс'),
        (r'Р Т'Р В»РЎРЏ Р С•Р С—РЎР‚Р ВµРЎРѓРЎРѓР С•Р Р†Р С"Р С' Р С–Р С'Р Т'РЎР‚Р В°Р Р†Р В»Р С'РЎвЂЎР ВµРЎРѓР С"Р С'РЎвЂ¦', 'для опрессовки гидравлических'),
        (r'РЎР‚РЎС"Р С"Р В°Р Р†Р С•Р Р†', 'рукавов'),
        (r'Р Т'Р С• 1\.1/2"', 'до 1.1/2"'),
        (r'РЎРѓ РЎв‚¬Р ВµРЎРѓРЎвЂљРЎРЉРЎР‹', 'с шестью'),
        (r'РЎРѓР С—Р С'РЎР‚Р В°Р В»РЎРЏР СР С'', 'спиралями'),
        (r'Р Т'Р С• 2"', 'до 2"'),
        (r'РЎРѓ РЎвЂЎР ВµРЎвЂљРЎвЂ№РЎР‚РЎРЉР СРЎРЏ', 'с четырьмя'),
        (r'Р СљР Р…Р С•Р С–Р С•РЎвЂћРЎС"Р Р…Р С"РЎвЂ Р С'Р С•Р Р…Р В°Р В»РЎРЉР Р…Р В°РЎРЏ', 'Многофункциональная'),
        (r'Р СР В°РЎв‚¬Р С'Р Р…Р В°', 'машина'),
        (r'Р Т'Р В»РЎРЏ РЎРѓР ВµРЎР‚Р Р†Р С'РЎРѓР В°', 'для сервиса'),
        
        # Навигация
        (r'Р С› Р С™Р С›Р СљР СџР С'Р СњР Р ', 'О КОМПАНИИ'),
        (r'Р РЋР вЂўР В Р СћР Р В¤Р Р С™Р С'Р СћР В«', 'СЕРТИФИКАТЫ'),
        (r'Р РЋР СџР В Р С'Р вЂ™Р С›Р В§Р СњР Р С™', 'СПРАВОЧНИК'),
        (r'Р С™Р С›Р СњР СћР С'Р С™Р СћР В«', 'КОНТАКТЫ'),
        (r'Р вЂ"Р С'Р С™Р С'Р вЂ" Р РЋ Р РЋР С'Р в„ўР СћР С'', 'ЗАКАЗ С САЙТА'),
        (r'Р С›РЎвЂљР С"РЎР‚РЎвЂ№РЎвЂљРЎРЉ Р СР ВµР Р…РЎР‹', 'Открыть меню'),
        
        # Общие
        (r'Р вЂєР С•Р С–Р С•РЎвЂљР С'Р С—', 'Логотип'),
        (r'Р С—РЎР‚Р С•Р Т'РЎС"Р С"РЎвЂ Р С'Р С'РЎРЏ', 'Продукция'),
        (r'Р С•Р В±Р С•РЎР‚РЎС"Р Т'Р С•Р Р†Р В°Р Р…Р С'Р Вµ', 'Оборудование'),
        (r'Р С›Р В±Р Р…Р С•Р Р†Р В»Р ВµР Р…Р С•', 'Обновлено'),
    ]
    
    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content)
    
    return content

def fix_file(filepath):
    """Исправляет файл"""
    try:
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
        
        # Проверяем наличие кракозябров
        if 'Р С' in content[:2000] or 'РІв' in content[:2000]:
            # Исправляем
            fixed_content = fix_mojibake_content(content)
            
            # Сохраняем
            with open(filepath, 'w', encoding='utf-8', newline='') as f:
                f.write(fixed_content)
            return True
        return False
    except Exception as e:
        print(f"Ошибка {filepath}: {e}")
        return False

def main():
    html_files = glob.glob('**/*.html', recursive=True)
    
    files_to_fix = []
    for filepath in sorted(html_files):
        try:
            with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
            if 'Р С' in content[:2000] or 'РІв' in content[:2000]:
                files_to_fix.append(filepath)
        except:
            pass
    
    print(f"Найдено файлов: {len(files_to_fix)}")
    fixed = 0
    for filepath in files_to_fix:
        if fix_file(filepath):
            fixed += 1
            if fixed % 20 == 0:
                print(f"Исправлено: {fixed}...")
    
    print(f"Исправлено: {fixed}/{len(files_to_fix)}")

if __name__ == '__main__':
    main()

