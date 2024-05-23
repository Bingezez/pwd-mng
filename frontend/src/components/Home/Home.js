import React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import "../base.css";
import style from "./Home.module.css";

const Home = () => {
    return (
        <div className={style.root}>
            <div className={style.inner}>
                    <Typography variant="h5" paragraph>
                        Правила використання менеджера паролів
                    </Typography>
                    <Divider className={style.divider} />
                    <Typography variant="body1" paragraph>
                        1. <strong>Створюйте міцні паролі:</strong> Використовуйте комбінації великих і малих літер, цифр та спецсимволів.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        2. <strong>Не використовуйте один пароль для всіх облікових записів:</strong> Кожен обліковий запис повинен мати унікальний пароль для максимальної безпеки.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        3. <strong>Використовуйте генератори паролів:</strong> Використовуйте вбудовані генератори паролів для створення випадкових і міцних паролів.
                    </Typography>
                    {/* Додайте інші правила */}
            </div>
        </div>
    );
};

export default Home;
