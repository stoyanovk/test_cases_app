module.exports.getSuccessRegisterLayout = function (mail) {
  return {
    to: mail,
    from: process.env.MAIL_ADDRESS,
    subject: "Создание аккаунта",
    text: "Аккаунт успешно создан",
    html: `<h2>Аккаунт успешно создан</h2>
    <p>Для того чтобы вернуться на сайт перейдите по <a href="${process.env.RESOLVE_HOST}">ссылке</a></p>`,
  };
};

module.exports.getResetPasswordLayout = function (mail, token) {
  return {
    to: mail,
    from: process.env.MAIL_ADDRESS,
    subject: "Восостановление пароля",
    text: "Восстановление пароля аккаунта",
    html: `<h2>Восостановление пароля</h2>
        <p>Если вы не восстанавливаете пароль от личного кабинета на ${process.env.RESOLVE_HOST}, то проигнорируйте это сообщение </p>
        <p>Для восстановления пароля перейдите по <a href="${process.env.RESOLVE_HOST}/reset-password/${token}">ссылке</a></p>`,
  };
};
