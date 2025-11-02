# 📦 ИНСТРУКЦИЯ ПО ЗАГРУЗКЕ ПРОЕКТА В GIT

## 🚀 Первичная настройка (первый раз)

### 1. Инициализация репозитория
```bash
git init
```

### 2. Создание .gitignore (если еще нет)
```bash
# Создайте файл .gitignore со следующим содержимым:
# node_modules/
# .DS_Store
# *.log
# .env
```

### 3. Добавление всех файлов
```bash
git add .
```

### 4. Первый коммит
```bash
git commit -m "Initial commit: Полный редизайн сайта и создание 59 страниц продуктов"
```

---

## 🔗 Подключение к удаленному репозиторию (GitHub/GitLab/Bitbucket)

### 1. Создайте репозиторий на GitHub/GitLab
- Зайдите на github.com (или gitlab.com)
- Создайте новый репозиторий
- НЕ инициализируйте его (не добавляйте README, .gitignore)

### 2. Подключите удаленный репозиторий
```bash
# Замените URL на ваш репозиторий
git remote add origin https://github.com/ваш-username/ваш-репозиторий.git

# Или через SSH:
git remote add origin git@github.com:ваш-username/ваш-репозиторий.git
```

### 3. Проверьте подключение
```bash
git remote -v
```

---

## 📤 Загрузка на GitHub (первая загрузка)

### 1. Переименуйте ветку в main (если нужно)
```bash
git branch -M main
```

### 2. Отправьте код на GitHub
```bash
git push -u origin main
```

**Если возникнет ошибка аутентификации:**
- Используйте Personal Access Token вместо пароля
- Или настройте SSH ключи

---

## 🔄 Рабочий процесс (после первой загрузки)

### 1. Проверка изменений
```bash
git status
```

### 2. Добавление изменений
```bash
# Все файлы
git add .

# Или конкретный файл
git add path/to/file.html
```

### 3. Создание коммита
```bash
git commit -m "Описание изменений"
```

### 4. Отправка на GitHub
```bash
git push
```

---

## 📝 Полезные команды

### Просмотр истории
```bash
git log
git log --oneline
```

### Просмотр изменений
```bash
git diff
git diff --staged
```

### Отмена изменений
```bash
# Отменить изменения в файле (до add)
git restore filename.html

# Отменить add
git restore --staged filename.html
```

### Создание новой ветки
```bash
git checkout -b feature/new-feature
```

---

## 🎯 Быстрая шпаргалка

```bash
# Ежедневный workflow:
git status                    # Проверить изменения
git add .                     # Добавить все файлы
git commit -m "Описание"      # Создать коммит
git push                      # Отправить на GitHub
```

---

## ⚠️ Если что-то пошло не так

### Отменить последний коммит (но сохранить изменения)
```bash
git reset --soft HEAD~1
```

### Отменить последний коммит (удалить изменения)
```bash
git reset --hard HEAD~1
```

### Синхронизация с удаленным репозиторием
```bash
git pull origin main
```

---

## 🔐 Настройка SSH ключей (рекомендуется)

### 1. Генерация ключа
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### 2. Показать публичный ключ
```bash
cat ~/.ssh/id_ed25519.pub
```

### 3. Добавить ключ в GitHub
- Settings → SSH and GPG keys → New SSH key
- Вставьте публичный ключ

---

## 💡 Рекомендации по коммитам

**Хорошие сообщения коммитов:**
- `"Исправлена навигация на странице продуктов"`
- `"Добавлены 12 страниц D-HYDRO продуктов"`
- `"Обновлен дизайн footer для всех страниц"`

**Плохие сообщения:**
- `"fix"`
- `"changes"`
- `"update"`

