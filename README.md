# 🧪 15/100 Form With Validation (React + TypeScript)

Форма с валидацией на лету и проверкой при сабмите. Реализована на **React + TypeScript**, стили — `SCSS`. Поддерживает кастомные правила валидации через `RegExp`. Реализовано в рамках челленджа **"100 проектов"**.

---

## 🔧 Использование

Импортируй компонент и передай правила валидации:

```bash
import { FormWithValidation } from "./FormWithValidation";

const validationRules = {
name: /^[a-zA-Z\s]{3,}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
message: /^.{10,}$/,
acceptRules: /true/,
};

<FormWithValidation validationRules={validationRules} />;

```

---

## 💡 Особенности

-   ✅ Валидация по onChange (поля)
-   ⚠️ Ошибки отображаются только после сабмита
-   🧼 Сброс формы после успешной отправки
-   🔲 Кастомный чекбокс на иконках lucide-react
-   🎨 Стили на SCSS

---

## ✍️ Пример правил валидации

```bash
const validationRules = {
  name: /^[a-zA-Z\s]{3,}$/,        // минимум 3 буквы
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // простая проверка email
  message: /^.{10,}$/,             // минимум 10 символов
  acceptRules: /true/,             // должен быть true
};
```

---

## 📦 Установка

```bash
# 1. Клонируй репозиторий
git clone https://github.com/dmitrychervochkin/15-form-validation.git

# 2. Перейди в папку проекта
cd 15-form-validation

# 3. Установи зависимости
npm install

# 4. Запусти в dev-режиме
npm run dev
```

![Превью](./public/preview.mov)
