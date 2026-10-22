# Nagrzewamy

**Strona:** [popielseba.github.io/nagrzewamy](https://popielseba.github.io/nagrzewamy/)  
**Repozytorium:** [PopielSeba/nagrzewamy](https://github.com/PopielSeba/nagrzewamy)

Polskojęzyczny serwis wynajmu i sprzedaży nagrzewnic przemysłowych. Strona jest generowana do zwykłych plików HTML, CSS i JavaScript. Projekt wymaga **Node.js 22 lub nowszego** i nie ma zależności npm potrzebnych do budowania ani działania strony.

Wersja początkowa przedstawia model **MASTER BV-691S, 225 kW, ogrzewanie pośrednie**. Oferta obejmuje dobór konfiguracji i koordynację dostawy w Polsce oraz Unii Europejskiej. Sprzedaż i wynajem prowadzą do indywidualnego zapytania; na stronie nie ma wymyślonych cen, stanów magazynowych ani deklaracji natychmiastowej dostępności.

## Adres i publikacja

**`https://nagrzewamy.pl` to planowany adres, ustawiony jako domyślna wartość `SITE_URL`. W ramach przygotowania projektu domena nie została zarejestrowana ani podłączona.** Przed publikacją ustaw rzeczywisty adres, pod którym strona ma być dostępna. Od `SITE_URL` zależą adresy canonical, mapa witryny i adresy w danych strukturalnych.

Strona została opublikowana w GitHub Pages. [Wdrożenie z 22 października 2026 r.](https://github.com/PopielSeba/nagrzewamy/actions/runs/39742933094) zakończyło się pomyślnie po budowaniu, kontroli dziewięciu stron i testach formularza. Sprawdzono również nawigację, galerię, przygotowanie zapytań oraz układ mobilny przy szerokości 390 px.

Oba workflow GitHub mają wyłącznie zdarzenie `workflow_dispatch`: zapis plików i zwykły push nie uruchamiają publikacji. Kolejne wdrożenie uruchom przez Actions → Publikacja GitHub Pages (ręczna) → Run workflow.

## Uruchomienie lokalne

W katalogu projektu wykonaj:

```bash
npm run build
npm run check
npm test
```

Nie jest potrzebny krok `npm install`. Wynik budowania znajduje się w `dist/`; kolejne uruchomienie builda odtwarza ten katalog ze źródeł.

Opcjonalny podgląd przez prosty serwer plików:

```bash
npm exec -- serve dist
```

Otwórz adres podany przez serwer. `serve` jest opcjonalnym narzędziem deweloperskim; npm może zapytać o pobranie go do swojej pamięci podręcznej. Nie jest zależnością projektu. Każda podstrona ma własny plik HTML, więc używaj zwykłego serwowania plików statycznych. [Dokumentacja `npm exec`](https://docs.npmjs.com/cli/v11/commands/npm-exec/).

Po zmianie treści lub wyglądu ponownie wykonaj `npm run build`.

## Co edytować

| Plik lub katalog | Przeznaczenie |
| --- | --- |
| `src/content.mjs` | Dane firmy, FAQ, zastosowania, korzyści, proces kontaktu oraz treści stron wynajmu i sprzedaży. |
| `src/templates.mjs` | Struktura stron, nawigacja, nagłówki, metadane, dane strukturalne, karta urządzenia i formularz. |
| `public/styles.css` | Wygląd, czerwony akcent marki, układ responsywny i stany interakcji. |
| `public/app.js` | Menu mobilne, przygotowanie zapytania, kopiowanie treści i galeria. |
| `public/` | Pliki kopiowane do katalogu wynikowego, w tym obrazy i pozostałe zasoby. |
| `scripts/build.mjs` | Generowanie HTML, mapy witryny, `robots.txt` i plików pomocniczych. |
| `scripts/check.mjs` | Kontrola wygenerowanych stron, metadanych, danych JSON-LD, odnośników i mapy witryny. |
| `tests/` | Testy uruchamiane przez wbudowany mechanizm `node --test`. |
| `docs/source-review.md` | Źródła treści oraz decyzje dotyczące parametrów technicznych. |
| `.github/workflows/` | Ręczna kontrola projektu oraz ręczne wdrożenie GitHub Pages. |
| `vercel.json` | Ustawienia budowania i katalogu wynikowego dla Vercel. |

Zmiany wprowadzaj w plikach źródłowych; `dist/` jest wynikiem budowania.

## Podstrony

Build generuje **9 stron HTML**, w tym stronę błędu 404:

| Adres | Treść |
| --- | --- |
| `/` | Strona główna. |
| `/wynajem-nagrzewnic/` | Wynajem nagrzewnic. |
| `/sprzedaz-nagrzewnic/` | Sprzedaż i indywidualna oferta zakupu. |
| `/nagrzewnice/master-bv-691s/` | Karta nagrzewnicy MASTER BV-691S. |
| `/zastosowania/ogrzewanie-hal-namiotowych/` | Ogrzewanie hal namiotowych. |
| `/zastosowania/ogrzewanie-magazynow/` | Ogrzewanie magazynów i hal. |
| `/zastosowania/ogrzewanie-budowy/` | Ogrzewanie budów i zaplecza. |
| `/kontakt/` | Dane kontaktowe i przygotowanie zapytania. |
| `/404.html` | Strona błędu, wyłączona z mapy witryny. |

W katalogu `dist/` powstają również `sitemap.xml`, `robots.txt`, `.nojekyll` i `_headers`.

## Formularz i kontakt

Formularz **nie ma backendu i nie wysyła wiadomości**. Po sprawdzeniu wymaganych pól przygotowuje treść zapytania. Użytkownik sam wybiera:

- **Otwórz w poczcie** — otwarcie wiadomości przez link `mailto:` w skonfigurowanym programie pocztowym;
- **Kopiuj treść** — skopiowanie tekstu do samodzielnego wykorzystania.

Komunikat „Zapytanie jest gotowe” oznacza przygotowanie tekstu, a nie wysłanie wiadomości. Dostępna jest również bezpośrednia ścieżka kontaktu telefonicznego i e-mailowego. Kod strony nie zawiera analityki ani zapisu formularza w `localStorage`.

Dane kontaktowe użyte w projekcie:

- **REKORD HALE NAMIOTOWE SP. Z O.O.**
- ul. Kazimierza Wielkiego 1, 50-077 Wrocław;
- telefon: **+48 571 294 344**;
- e-mail: **dystrybucja@halenamiotowe.com.pl**.

Główne dane edytuje się w `src/content.mjs`. Po zmianie telefonu lub adresu e-mail sprawdź też treści FAQ oraz odbiorcę zapytania w `public/app.js`.

## Parametry i źródła oferty

Przed rozszerzeniem specyfikacji przeczytaj [weryfikację źródeł](docs/source-review.md). Dokument wyjaśnia różnicę między oznaczeniem urządzenia w istniejącej ofercie a bieżącymi materiałami producenta.

Publiczna oferta używa potwierdzonego zakresu: **MASTER BV-691S, 225 kW, ogrzewanie pośrednie**. Nie określa stanu urządzeń jako nowych lub używanych. Ceny, dostępność, wyposażenie i warunki dostawy są przedmiotem indywidualnego zapytania. Nowe modele lub dodatkowe parametry należy dodać po potwierdzeniu ich dla oferowanego sprzętu.

## Adres publikacji: `SITE_URL` i `BASE_PATH`

| Zmienna | Znaczenie |
| --- | --- |
| `SITE_URL` | Pełny publiczny adres bazowy strony, bez końcowego `/`. Przy publikacji w podkatalogu obejmuje także ten podkatalog. Domyślnie: planowane `https://nagrzewamy.pl`. |
| `BASE_PATH` | Prefiks ścieżek zasobów i odnośników, np. `/nagrzewamy` dla strony projektowej GitHub Pages. Dla własnej domeny i hostingu w katalogu głównym pozostaje pusty. |

Przykłady konfiguracji:

| Sposób publikacji | `SITE_URL` | `BASE_PATH` |
| --- | --- | --- |
| Własna domena, po jej skonfigurowaniu | `https://example.com` | pusty |
| Projekt GitHub Pages | `https://WLASCICIEL.github.io/REPOZYTORIUM` | `/REPOZYTORIUM` |
| Główny adres projektu hostingu | rzeczywisty adres projektu, np. `https://PROJEKT.pages.dev` | pusty |

`example.com`, `WLASCICIEL`, `REPOZYTORIUM` i `PROJEKT` są wartościami przykładowymi do zastąpienia.

Przykład dla Bash, z takim samym środowiskiem dla budowania i kontroli:

```bash
export SITE_URL="https://example.com"
export BASE_PATH=""
npm run build
npm run check
npm test
```

Odpowiednik w PowerShell:

```powershell
$env:SITE_URL = "https://example.com"
$env:BASE_PATH = ""
npm run build
npm run check
npm test
```

Ustawienie zmiennych nie rejestruje domeny i nie zmienia DNS. Zmiana adresu publikacji wymaga ponownego zbudowania strony.

## Ręczne workflow GitHub

| Workflow | Działanie |
| --- | --- |
| `ci.yml` — **Kontrola projektu** | Buduje stronę, uruchamia kontrolę wyniku i testy. Nie publikuje. |
| `pages.yml` — **Publikacja GitHub Pages (ręczna)** | Buduje, sprawdza i testuje projekt, przesyła katalog `dist/`, a następnie wdraża go w skonfigurowanej usłudze GitHub Pages. |

Oba uruchamia się przez **Actions → wybrany workflow → Run workflow**. Pliki muszą wcześniej znajdować się w repozytorium. Workflow Pages zakłada adres projektu `https://WLASCICIEL.github.io/REPOZYTORIUM` i sam ustawia odpowiadające mu `SITE_URL` oraz `BASE_PATH`.

Akcje są przypięte do pełnych identyfikatorów commitów oficjalnych stabilnych wydań, sprawdzonych 22 października 2026 r.:

| Akcja | Wydanie |
| --- | --- |
| `actions/checkout` | [v7.0.1](https://github.com/actions/checkout/releases/tag/v7.0.1) |
| `actions/setup-node` | [v7.1.0](https://github.com/actions/setup-node/releases/tag/v7.1.0) |
| `actions/configure-pages` | [v6.0.0](https://github.com/actions/configure-pages/releases/tag/v6.0.0) |
| `actions/upload-pages-artifact` | [v5.0.0](https://github.com/actions/upload-pages-artifact/releases/tag/v5.0.0) |
| `actions/deploy-pages` | [v5.0.1](https://github.com/actions/deploy-pages/releases/tag/v5.0.1) |

Źródła: [workflow GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) i [budowanie oraz testowanie Node.js](https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs).

## Wdrożenie

### GitHub Pages

1. Zapisz projekt w docelowym repozytorium GitHub i sprawdź wynik ręcznego workflow **Kontrola projektu**.
2. W **Settings → Pages → Build and deployment** wybierz źródło **GitHub Actions**. Sprawdź, czy środowisko `github-pages` dopuszcza wybraną gałąź.
3. Zweryfikuj adres docelowy. Dostarczony `pages.yml` jest przeznaczony dla strony projektowej w podkatalogu. Dla repozytorium `WLASCICIEL.github.io` albo własnej domeny zmień `SITE_URL` i wyzeruj `BASE_PATH` w workflow przed uruchomieniem.
4. Uruchom ręcznie **Publikacja GitHub Pages (ręczna)**. Adres wdrożenia pojawi się w środowisku `github-pages` po zakończeniu zadania publikacji.

Workflow wykorzystuje uprawnienia `pages: write` i `id-token: write` wyłącznie w zadaniu wdrożenia. Nie dodaje osobistego tokenu dostępu ani nie konfiguruje domeny. [Instrukcja GitHub](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

### Cloudflare Pages

1. Utwórz projekt Pages i wybierz docelowe repozytorium.
2. W konfiguracji budowania ustaw polecenie `npm run build && npm run check && npm test` oraz katalog wynikowy `dist`.
3. Ustaw `NODE_VERSION=22`, `SKIP_DEPENDENCY_INSTALL=1`, właściwy `SITE_URL` i pusty `BASE_PATH` dla publikacji w katalogu głównym.
4. Po sprawdzeniu konfiguracji uruchom pierwsze wdrożenie. Ustawienia integracji Git określają, czy późniejsze zmiany mają uruchamiać kolejne publikacje.

Źródła: [statyczne strony na Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/) i [środowisko budowania oraz zmienne](https://developers.cloudflare.com/pages/configuration/build-image/).

### Vercel

1. Zaimportuj docelowe repozytorium do wybranego projektu Vercel. Jako katalog projektu wskaż katalog zawierający `package.json`.
2. Wybierz Node.js 22 lub nowszy. `vercel.json` ustawia framework **Other**, pomija instalację zależności, uruchamia build z kontrolą i testami oraz wskazuje `dist` jako wynik.
3. Ustaw rzeczywisty `SITE_URL` i pusty `BASE_PATH` w środowisku właściwym dla planowanego wdrożenia.
4. Uruchom wdrożenie dopiero po sprawdzeniu tych ustawień. Własną domenę dodaj po potwierdzeniu prawa do korzystania z niej i skonfiguruj DNS według wartości podanych dla tego projektu.

Źródło: [konfiguracja `vercel.json`](https://vercel.com/docs/project-configuration/vercel-json).

### Po wdrożeniu

Sprawdź stronę główną, podstrony, obrazy, galerię oraz menu na telefonie. Przejdź formularz wynajmu i zakupu, sprawdź przygotowany tekst i odbiorcę wiadomości. Potwierdź działanie linków telefonicznych, mapy witryny, adresów canonical i odpowiedzi HTTP 404 dla nieistniejącego adresu. Przy zmianie hostingu lub domeny ponów build z aktualnym `SITE_URL` i `BASE_PATH`.
