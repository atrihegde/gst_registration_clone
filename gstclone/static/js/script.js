document.addEventListener("DOMContentLoaded", () => {
  const registrationRadios = document.querySelectorAll(
    'input[name="registrationType"]'
  );
  const trnForm = document.getElementById("trnForm");
  const newRegistrationForm = document.getElementById("newRegistrationForm");

  trnForm.style.display = "none";
  newRegistrationForm.style.display = "block";

  registrationRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.value === "newRegistration" && radio.checked) {
        newRegistrationForm.style.display = "block";
        trnForm.style.display = "none";
      } else if (radio.value === "trn" && radio.checked) {
        newRegistrationForm.style.display = "none";
        trnForm.style.display = "block";
      }
    });
  });

  // CAPTCHA functionality
  let newRegCaptcha = "";
  let trnCaptcha = "";

  function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

  function createCaptchaHTML(captchaId, inputId) {
    return `
      <div style="display: flex; align-items: center; gap: 15px; margin: 10px 0;">
        <div id="${captchaId}" style="background: #f5f5f5; border: 2px solid #c0bfbf; padding: 10px 15px; font-size: 18px; font-weight: bold; letter-spacing: 3px; border-radius: 4px; color: #333;"></div>
        <button type="button" onclick="refresh${captchaId.charAt(0).toUpperCase() + captchaId.slice(1)}()" style="background: #4CAF50; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 14px;">Refresh</button>
      </div>
      <div id="${inputId}Error" style="color: red; font-size: 14px; margin-bottom: 10px; display: none;">Enter correct CAPTCHA!</div>
    `;
  }

  function initializeCaptchas() {
    const newRegCaptchaImg = newRegistrationForm.querySelector('img[alt="CAPTCHA"]');
    if (newRegCaptchaImg) {
      newRegCaptchaImg.outerHTML = createCaptchaHTML("newRegCaptchaText", "newRegCaptcha");
      newRegCaptcha = generateCaptcha();
      document.getElementById("newRegCaptchaText").textContent = newRegCaptcha;
    }

    const trnCaptchaImg = trnForm.querySelector('img[alt="CAPTCHA"]');
    if (trnCaptchaImg) {
      trnCaptchaImg.outerHTML = createCaptchaHTML("trnCaptchaText", "trnCaptcha");
      trnCaptcha = generateCaptcha();
      document.getElementById("trnCaptchaText").textContent = trnCaptcha;
    }
  }

  window.refreshNewRegCaptchaText = function () {
    newRegCaptcha = generateCaptcha();
    document.getElementById("newRegCaptchaText").textContent = newRegCaptcha;
    const captchaInput = newRegistrationForm.querySelector('input[name="captcha"]');
    if (captchaInput) captchaInput.value = "";
    document.getElementById("newRegCaptchaError").style.display = "none";
  };

  window.refreshTrnCaptchaText = function () {
    trnCaptcha = generateCaptcha();
    document.getElementById("trnCaptchaText").textContent = trnCaptcha;
    const captchaInput = trnForm.querySelector('input[name="captcha_trn"]');
    if (captchaInput) captchaInput.value = "";
    document.getElementById("trnCaptchaError").style.display = "none";
  };

  function validateCaptcha(userInput, correctCaptcha, errorElementId) {
    const errorElement = document.getElementById(errorElementId);
    if (userInput.toUpperCase() === correctCaptcha) {
      errorElement.style.display = "none";
      return true;
    } else {
      errorElement.style.display = "block";
      return false;
    }
  }

  newRegistrationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const captchaInput = newRegistrationForm.querySelector('input[name="captcha"]');

    if (validateCaptcha(captchaInput.value, newRegCaptcha, "newRegCaptchaError")) {
       if (confirm("Form Submitted Successfully!! Click OK to continue.")) {
        HTMLFormElement.prototype.submit.call(newRegistrationForm);
      }
    } else {
      alert("Enter correct CAPTCHA!!")
      window.refreshNewRegCaptchaText();
    }
  });

  trnForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const captchaInput = trnForm.querySelector('input[name="captcha_trn"]');

    if (validateCaptcha(captchaInput.value, trnCaptcha, "trnCaptchaError")) {
      if (confirm("Form Submitted Successfully!! Click OK to continue.")) {
        HTMLFormElement.prototype.submit.call(trnForm);
      }
    } else {
      alert("Enter correct CAPTCHA!!")
      window.refreshTrnCaptchaText();
    }
  });

  document.addEventListener("input", (e) => {
    if (e.target.name === "captcha") {
      document.getElementById("newRegCaptchaError").style.display = "none";
    } else if (e.target.name === "captcha_trn") {
      document.getElementById("trnCaptchaError").style.display = "none";
    }
  });

  setTimeout(initializeCaptchas, 100);


  // State-District Dropdown Logic 

  fetch("/static/data/states_districts.json")
    .then((response) => response.json())
    .then((data) => {
      const stateDropdown = document.getElementById("state");
      const districtDropdown = document.getElementById("district");

      if (!stateDropdown || !districtDropdown) return;

      Object.keys(data).forEach((state) => {
        let option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        stateDropdown.appendChild(option);
      });

      stateDropdown.addEventListener("change", () => {
        const selectedState = stateDropdown.value;
        districtDropdown.innerHTML = '<option value="">-- Select District --</option>';
        districtDropdown.disabled = !selectedState;

        if (selectedState && data[selectedState]) {
          data[selectedState].forEach((district) => {
            let option = document.createElement("option");
            option.value = district;
            option.textContent = district;
            districtDropdown.appendChild(option);
          });
        }
      });
    })
    .catch((error) => console.error("Error loading states/districts:", error));
});