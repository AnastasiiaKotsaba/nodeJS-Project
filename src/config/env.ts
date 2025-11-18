import { cleanEnv, str } from "envalid"

// Отримуємо змінні оточення з .env та валідируємо їх, щоб ми завжди могли їх використовувати в коді
// process.env - це об'єкт з усіма змінними оточення
export const ENV = cleanEnv(process.env, {
    SECRET_KEY: str()
})
console.log(typeof ENV.SECRET_KEY)