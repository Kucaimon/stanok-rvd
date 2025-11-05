#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Находит и исправляет кракозябры во всех файлах
"""
import os
import glob
import re

def has_mojibake(text):
    """Проверяет наличие кракозябров"""
    # Типичные паттерны кракозябров
    patterns = [
        r'Р[І-Я]{2,}',  # Р и кириллица
        r'Р[ћ-я]{2,}',  # Р и кириллица нижний регистр
        r'в[Ђ-Я]{2,}',  # в и кириллица
        r'РІв',  # классические
        r'СЂ',  # двойная кодировка
        r'Рѕ',  # двойная кодировка
        r'РЅ',  # двойная кодировка
        r'РІ',  # двойная кодировка
    ]
    
    for pattern in patterns:
        if re.search(pattern, text[:2000]):
            return True
    return False

def fix_file(filepath):
    """Исправляет файл с кракозябрами"""
    try:
        # Читаем как байты
        with open(filepath, 'rb') as f:
            raw = f.read()
        
        # Пробуем декодировать через cp1251 (если была двойная кодировка)
        content = None
        try:
            # Сначала пробуем UTF-8
            content_utf8 = raw.decode('utf-8')
            if not has_mojibake(content_utf8):
                return False  # Файл уже правильный
            # Если есть кракозябры, пробуем декодировать через cp1251
            content_cp1251 = raw.decode('cp1251')
            # Если это не кракозябры, используем cp1251
            if not has_mojibake(content_cp1251):
                content = content_cp1251
            else:
                # Пробуем двойную декодировку: cp1251 -> utf-8
                try:
                    # Если файл был в cp1251, но сохранен как utf-8
                    double_decoded = raw.decode('cp1251').encode('latin-1').decode('utf-8')
                    if not has_mojibake(double_decoded):
                        content = double_decoded
                except:
                    pass
        except:
            pass
        
        if content is None:
            # Если не получилось, пробуем просто cp1251
            try:
                content = raw.decode('cp1251')
            except:
                content = raw.decode('utf-8', errors='replace')
        
        # Сохраняем как UTF-8
        with open(filepath, 'w', encoding='utf-8', newline='') as f:
            f.write(content)
        
        return True
    except Exception as e:
        print(f"Ошибка {filepath}: {e}")
        return False

def main():
    html_files = glob.glob('**/*.html', recursive=True)
    js_files = glob.glob('**/*.js', recursive=True)
    all_files = html_files + js_files
    
    files_with_mojibake = []
    
    print("Поиск файлов с кракозябрами...")
    print("=" * 60)
    
    for filepath in sorted(all_files):
        try:
            with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
            
            if has_mojibake(content):
                files_with_mojibake.append(filepath)
                print(f"❌ Найдены кракозябры: {filepath}")
        except:
            pass
    
    print("=" * 60)
    print(f"\nНайдено файлов с кракозябрами: {len(files_with_mojibake)}")
    
    if files_with_mojibake:
        print("\nИсправление файлов...")
        fixed = 0
        for filepath in files_with_mojibake:
            if fix_file(filepath):
                fixed += 1
                print(f"✅ Исправлен: {filepath}")
        print(f"\nИсправлено файлов: {fixed}/{len(files_with_mojibake)}")
    else:
        print("\n✅ Все файлы в порядке!")

if __name__ == '__main__':
    main()

