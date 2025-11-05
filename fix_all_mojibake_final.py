#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Финальное исправление всех кракозябров на сайте
"""
import os
import glob
import re

def fix_mojibake_in_content(content):
    """Исправляет кракозябры в тексте, заменяя их на правильный русский текст"""
    # Этот метод не используется, используем декодирование файлов
    return content

def fix_file_encoding(filepath):
    """Правильно исправляет кодировку файла"""
    try:
        # Читаем как байты
        with open(filepath, 'rb') as f:
            raw = f.read()
        
        # Пробуем разные методы декодирования
        results = []
        
        # Метод 1: UTF-8
        try:
            content_utf8 = raw.decode('utf-8')
            # Проверяем на кракозябры
            if not has_severe_mojibake(content_utf8):
                results.append((content_utf8, 'utf-8'))
        except:
            pass
        
        # Метод 2: CP1251
        try:
            content_cp1251 = raw.decode('cp1251')
            if not has_severe_mojibake(content_cp1251):
                results.append((content_cp1251, 'cp1251'))
        except:
            pass
        
        # Метод 3: Двойное декодирование (latin-1 -> cp1251)
        try:
            latin1_content = raw.decode('latin-1')
            reencoded = latin1_content.encode('latin-1')
            double_decoded = reencoded.decode('cp1251', errors='replace')
            if not has_severe_mojibake(double_decoded):
                results.append((double_decoded, 'double'))
        except:
            pass
        
        # Выбираем лучший результат
        if results:
            # Предпочитаем UTF-8, если он не содержит кракозябров
            for content, encoding in results:
                if encoding == 'utf-8' and not has_severe_mojibake(content):
                    # Сохраняем как UTF-8
                    with open(filepath, 'w', encoding='utf-8', newline='') as f:
                        f.write(content)
                    return True
                elif encoding == 'cp1251':
                    # Сохраняем декодированный через cp1251 как UTF-8
                    with open(filepath, 'w', encoding='utf-8', newline='') as f:
                        f.write(content)
                    return True
            
            # Если ничего не подошло, используем первый результат
            content, encoding = results[0]
            with open(filepath, 'w', encoding='utf-8', newline='') as f:
                f.write(content)
            return True
        
        return False
    except Exception as e:
        print(f"Ошибка {filepath}: {e}")
        return False

def has_severe_mojibake(text):
    """Проверяет наличие серьезных кракозябров"""
    sample = text[:3000] if len(text) > 3000 else text
    
    # Паттерны кракозябров
    patterns = [
        r'Р[І-Я]{2,}',  # Р и кириллица верхний регистр
        r'Р[ћ-я]{2,}',  # Р и кириллица нижний регистр
        r'Р С[А-Я]',  # Р С и кириллица
        r'РІв',  # Классические кракозябры
        r'Р С›',  # Еще один паттерн
        r'Р вЂ',  # Еще один
    ]
    
    for pattern in patterns:
        if re.search(pattern, sample):
            return True
    
    # Если в тексте много "Р " подряд (больше 5 в первых 500 символах)
    if sample[:500].count('Р ') > 5:
        return True
    
    return False

def main():
    html_files = glob.glob('**/*.html', recursive=True)
    
    files_with_mojibake = []
    
    print("Поиск файлов с кракозябрами...")
    print("=" * 60)
    
    for filepath in sorted(html_files):
        try:
            with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
            
            if has_severe_mojibake(content):
                files_with_mojibake.append(filepath)
                print(f"[MOJ] {filepath}")
        except:
            pass
    
    print("=" * 60)
    print(f"\nНайдено файлов с кракозябрами: {len(files_with_mojibake)}")
    
    if files_with_mojibake:
        print("\nИсправление файлов...")
        fixed = 0
        for filepath in files_with_mojibake:
            if fix_file_encoding(filepath):
                fixed += 1
                if fixed % 10 == 0:
                    print(f"Исправлено: {fixed}...")
        print(f"\n[OK] Исправлено файлов: {fixed}/{len(files_with_mojibake)}")
    else:
        print("\n[OK] Все файлы в порядке!")

if __name__ == '__main__':
    main()

