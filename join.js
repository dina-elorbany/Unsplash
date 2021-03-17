'use strict';

(() => {
  //- Selectors
  const form = document.querySelector('.join-form');
  const firstName = document.querySelector('.first-name');
  const lastName = document.querySelector('.last-name');
  const email = document.querySelector('.email');
  const password = document.querySelector('.password1');
  const confirmPassword = document.querySelector('.password2');

  const firstNameFeedback = document.querySelector('.firstNa-fdbck');
  const lastNameFeedback = document.querySelector('.lastNa-fdbck');
  const emailFeedback = document.querySelector('.mail-fdbck');
  const passFeedback = document.querySelector('.pass-fdbck');
  const confirmPassFeedback = document.querySelector('.confPass-fdbck');

  const submit = document.querySelector('.join-btn');

  //- Reusable functions
  const isRequired = value => (value === '' || value === null ? false : true);

  const isBetween = (length, min, max) =>
    length < min || length > max ? false : true;

  const isNameValid = name => {
    const regExp = /^[A-Za-z]+$/;
    return regExp.test(name);
  };

  const isEmailValid = email => {
    const regExp = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/;
    return regExp.test(email);
  };

  const isPasswordStrong = password => {
    const regExp = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    return regExp.test(password);
  };

  const reset = feedback => {
    feedback.textContent = ``;
    feedback.classList.remove('invalid-feedback');
  };

  const showError = (input, feedback, message = `Field can't be blank!`) => {
    // add the error class
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');

    // show the error message
    feedback.textContent = message;
    feedback.classList.add('invalid-feedback');
  };

  const showSuccess = (input, feedback) => {
    // remove the error class
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');

    // hide the error message
    feedback.textContent = '';
    feedback.classList.remove('invalid-feedback');
  };

  ///////////////////////////////

  //- When FocusIn
  form.addEventListener('focusin', e => {
    if (e.target === firstName) reset(firstNameFeedback);

    if (e.target === lastName) reset(lastNameFeedback);

    if (e.target === email) reset(emailFeedback);

    if (e.target === password) reset(passFeedback);

    if (e.target === confirmPassword) reset(confirmPassFeedback);
  });

  //- When FocusOut
  form.addEventListener('focusout', e => {
    if (e.target === firstName)
      checkNameValid(firstName, firstNameFeedback, 3, 12);

    if (e.target === lastName)
      checkNameValid(lastName, lastNameFeedback, 3, 15);

    if (e.target === email) checkEmailValid(email, emailFeedback);

    if (e.target === password) checkPasswordStrength(password, passFeedback);

    if (e.target === confirmPassword)
      checkPasswordMatch(password, confirmPassword, confirmPassFeedback);
  });

  ////////////////////////////////

  //- Check Name is only Letters and required
  const checkNameValid = (name, feedback, min, max) => {
    let valid = false;

    if (!isRequired(name.value)) {
      showError(name, feedback);
    } else if (!isNameValid(name.value)) {
      showError(name, feedback, `Must be only letters`);
    } else if (!isBetween(name.value.length, min, max)) {
      showError(name, feedback, `Must contain ${min}-${max} characters`);
    } else {
      showSuccess(name, feedback);
      valid = true;
    }
    return valid;
  };

  //- Check Email is valid
  const checkEmailValid = (email, feedback) => {
    let valid = false;

    if (!isRequired(email.value)) {
      showError(email, feedback);
    } else if (!isEmailValid(email.value)) {
      showError(email, feedback, `Invalid Email`);
    } else {
      showSuccess(email, feedback);
      valid = true;
    }
    return valid;
  };

  //- Check Password Strength
  const checkPasswordStrength = (password, feedback) => {
    let valid = false;

    if (!isRequired(password.value)) {
      showError(password, feedback);
    } else if (!isPasswordStrong(password.value)) {
      showError(
        password,
        feedback,
        `Min. 8 char, Contain at least (1 Upper, 1 Lower, 1 Number and 1 Symbol)`
      );
    } else {
      showSuccess(password, feedback);
      valid = true;
    }
    return valid;
  };

  //- Check Password Matching
  const checkPasswordMatch = (password1, password2, feedback) => {
    let valid = false;

    if (!isRequired(password2.value)) {
      showError(password2, feedback);
    } else if (password1.value !== password2.value) {
      showError(password2, feedback, `Is not matched!`);
    } else if (!isPasswordStrong(password2.value)) {
      showError(
        password2,
        feedback,
        `Matched, Min. 8 char, Contain at least (1 Upper, 1 Lower, 1 Number and 1 Symbol)`
      );
    } else {
      showSuccess(password2, feedback);
      valid = true;
    }
    return valid;
  };

  //- Form Submit Event
  submit.addEventListener('click', e => {
    e.preventDefault();

    if (
      checkNameValid(firstName, firstNameFeedback, 3, 12) &&
      checkNameValid(lastName, lastNameFeedback, 3, 15) &&
      checkEmailValid(email, emailFeedback) &&
      checkPasswordStrength(password, passFeedback) &&
      checkPasswordMatch(password, confirmPassword, confirmPassFeedback)
    ) {
      console.log(`Whole form is valid`);
      console.log(
        `Your username is: ${firstName.value.toLowerCase()}.${lastName.value
          .toLowerCase()
          .slice(0, 3)}${Math.floor(Math.random() * 999)}`
      );

      // Object for server
      const data = {
        firstName: firstName.value,
        lastName: lastName.value,
        username: `${firstName.value
          .toLowerCase()
          .slice(0.1)}.${lastName.value.toLowerCase().slice(0, 8)}${Math.floor(
          Math.random() * 999
        )}`,
        email: email.value,
        password: password.value,
      };

      console.log(data);
    }
  });
})();
