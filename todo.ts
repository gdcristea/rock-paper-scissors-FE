/***
 * 1. lucrez pe partea de server:
 * - 100% teste pe toate componentele
 *- cod pe BE sa fac toata partea de autentificare plus teste unitare pe BE

 * Nice to have:
 * -logica pentru atunci cand si-a uitat parola si vrea sa o schimbe - aici am nevoie de email / telefon renunt momentan - sa vad cum pot face asta. nice to have mai tarziu.
 * -accesibilitate (aria-labels, focus management)
 *
 * 4. UX extra*
 * 5. Idei de design
 * Branding (logo sus, culoare primară etc.)
 *

 * Back-end: Funcționalități și Validări (Java + DB)
 * 1. Primirea requestului
 * Primiți datele (username/email și parolă) prin POST la /api/auth/register sau similar
 *
 * Validați la nivel de API (să nu te bazezi DOAR pe FE!): deci mai apar niste erori de validare si aici
 *
 * Username/email: required, format, lungime, regex
 *
 * Password: required, lungime, complexitate
 *
 * 2. Check exist user
 * Căutați userul în DB (de obicei după username/email)
 *
 * Dacă există deja:
 *
 * Returnați status 409 (Conflict) și un mesaj “Username already exists” sau “Email already registered”
 *
 * Dacă nu există:
 *
 * Hashează parola (bcrypt sau argon2)
 *
 * Salvează userul cu parola hasheată
 *
 * 3. Răspunsuri API
 * Success: 201, “User registered successfully”
 *
 * Eroare de existență: 409, “User already exists”
 *
 * Eroare de validare: 400, mesaj clar de ce nu e ok
 *
 * 4. Alte considerente BE
 * Rate limiting la signup pentru a preveni brute-force
 *
 * Nu returna niciodată parola sau hash-ul în response!
 *
 * Loghează erori server în mod securizat, nu în response
 *
 * (Extra): Trimitere email de activare sau welcome (opțional)
 *
 * 🔵 Comunicarea FE ↔️ BE
 * La submit, FE validează local. Dacă e valid, trimite request la BE.
 *
 * FE tratează răspunsul:
 *
 * 201: Mesaj de succes și redirect către login/autologin
 *
 * 409: Afișează eroarea “Username already exists”
 *
 * 400: Afișează mesajul specific de validare
 *
 * Alte erori: “Unexpected error, please try again later”
 *
 * FE dezactivează butonul de submit în timp ce așteaptă răspunsul (spinner)
 *
 * La orice eroare, nu șterge ce a introdus utilizatorul în form
 *
 * 🟡 Extensii utile
 * Autologin după register, dacă vrei experiență mai rapidă
 *
 * Google/Facebook Login (social login)
 *
 * Captcha pentru anti-spam (recomandat pentru produse publice)
 *
 * Password strength meter (opțional, dar ajută userul)
 *
 * ✅ Checklist rapid pentru implementare
 *  Câmpuri: username/email, password, confirm password
 *
 *  Validări: required, lungime, pattern, match parola
 *
 *  Erori FE vizibile și prietenoase
 *
 *  Feedback la submit (loader, dezactivează buton)
 *
 *  Comunicare corectă cu BE, tratează toate codurile de răspuns
 *
 *  Nu returna informații sensibile
 *
 *  Responsive, design curat și clar
 *
 *  Accesibilitate minimă (focus, label, aria)
 *
 *  Rate limiting, hashing pe backend
 *
 *
 *  Alte notite:
 *  Plan finalizare joc:
 * Optional now:
 * -> adaug tipul de joc cu 5 opțiuni. Îl pun sa aleagă ce tip de joc vrea sa joace. ii pun undeva o opțiune.
 * -> web sockets play in real time.
 * -> adaug accessibility
 * -> adaug testele unitare
 * -> schimb readme de la frontend ul care e legat de backend
 * -> adaug readme pentru backend
 * -> cum ar fi sa integrez un blockchain aici?
 * -> Idee platforma pe care sa vad ce investiții am eu, poate to do list si expense tracker - pot sa
 * Fac o app așa doar cu angular material si sa o public oare similar cu app aia de o foloseam eu - si vând reclame.
 * -> Cand adaug clasamentul voi tine scorul in be si il voi actualiza mereu la fiecare joc
 *  o fac si aplicatie mobile
 * -> scriu teste unitare care mă vor ajuta sa nu stric ceva pe viitor in aplicație - frontend si backend
 *
 *
 *
 * 1.log in - reguli pe frontend pe câmpurile din formular
 * - Validare in be pentru toate câmpurile + eroare inline pentru fiecare câmp in parte si eroare daca emailul, usernamel ul este deja folosit
 * - Cazul cu success, be îmi răspunde cu ruta cu care navighează către pagina de login
 * - Error handling de adaugat
 * - Interceptor de adăugat care pune access tokenul
 * - Adaug translation si sa vina de acolo textele - sa vad daca pot identifica cumva limba device ului
 *
 * 2. Login - daca e cu success be îmi va da un token pe care îl salvez in localstorage si apoi îl redirecționez către joc - sau cookies ca sa nu fie văzut si îl cedez.
 * -aici daca tokenul e încă activ eu verific la pornirea aplicației si îl duc direct la joc. Cât timp sa las tokenul activ? Ce se întâmplă la expirarea tokenului - ar trebui sa îl redirecționez către login sau pagina de eroare?
 * -permit/nu salvarea datelor adică daca se logheaza sa existe autofill.
 * - Idee de pagina de login si signup
 * - Ce face daca uita pw? O poate schimba? Cum pot face asta?
 * - Zone protejate sunt toate in afara de signup atunci când el nu e logat si nu are token valid. Adică voi avea auth guard uri la toate celelalte rute.
 * - Adaug logica de logout cu buton si metoda?
 * * Tokenul JWT trebuie validat pe backend. Cum fac asta?
 * * Fă logout automat dacă tokenul expiră
 * Reîmprospătare token (refresh tokens) – opțional pentru mai târziu. Ce înseamnă asta?
 * - Fac un serviciu in angular pentru autentificare sau îl adaug tot așa in api service la nivel global?
 * - Adaug internalization. Sa îmi vina textele din json en/ro cu logica pe limba. De văzut cum iau limba.
 * - Testez aplicația pe mobile - iOS, android si pe safari, chrome, Firefox
 * - Ideea cu mesaje generate cu ai înainte de joc ca sa comunice gen computerul cu userul
 */
