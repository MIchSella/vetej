# SaldoApp - macOS Inkomst och Utgift Hanterare

En enkel och elegant macOS-app för att spåra dina inkomster och utgifter, byggd med SwiftUI.

## Funktioner

- ✅ **Lägg till inkomster** - Snabbt lägg till inkomster med namn och belopp i svenska kronor
- ✅ **Lägg till utgifter** - Spåra alla dina utgifter enkelt
- 💰 **Saldo beräkning** - Se ditt totala saldo direkt
- 📊 **Översikt** - Tydlig översikt av totala inkomster och utgifter
- 💾 **Persistent lagring** - Alla transaktioner sparas automatiskt
- 🎨 **Modern design** - Vacker och användarvänlig SwiftUI-interface
- ⌨️ **Tangentbordsgenvägar** - Snabb inmatning med tangentbordet
- 🗑️ **Radera transaktioner** - Swipe för att ta bort poster

## Krav

- macOS 14.0 (Sonoma) eller senare
- Xcode 15.0 eller senare
- Swift 5.9 eller senare

## Installation

### Steg 1: Öppna Xcode

1. Öppna Xcode
2. Välj "Create a new Xcode project"
3. Välj **macOS** → **App**
4. Klicka på "Next"

### Steg 2: Konfigurera projektet

Fyll i följande information:

- **Product Name:** `SaldoApp`
- **Team:** Välj ditt team (eller None för lokal utveckling)
- **Organization Identifier:** `com.yourname` (eller valfritt)
- **Bundle Identifier:** Skapas automatiskt
- **Interface:** `SwiftUI`
- **Language:** `Swift`
- **Storage:** None (vi använder UserDefaults)
- Avmarkera alla checkboxes (Tests, etc.)

Klicka på "Next" och välj var du vill spara projektet.

### Steg 3: Ersätt källfilerna

1. Ta bort de automatiskt skapade filerna:
   - `ContentView.swift` (kommer att ersättas)
   - `SaldoAppApp.swift` (kommer att ersättas)

2. Kopiera alla `.swift` filer från detta projekt:
   - `SaldoAppApp.swift`
   - `ContentView.swift`
   - `Transaction.swift`
   - `TransactionViewModel.swift`
   - `AddTransactionSheet.swift`

3. Kopiera Assets-katalogen om du vill

### Steg 4: Konfigurera projektet

1. Välj projektfilen i Xcode
2. Gå till **Signing & Capabilities**
3. Under **Deployment Info**, sätt **Minimum Deployment** till `macOS 14.0`
4. Välj ditt utvecklarteam om du har ett

### Steg 5: Bygg och kör

1. Tryck på `Cmd + R` eller klicka på Play-knappen
2. Appen startar på din Mac!

## Användning

### Lägg till inkomst

1. Klicka på den gröna **"+"** knappen i verktygsfältet (eller använd tangentbordsgenvägen)
2. Fyll i namnet på inkomsten (t.ex. "Lön", "Bonus", "Försäljning")
3. Ange beloppet i svenska kronor
4. Klicka på "Lägg till inkomst"

### Lägg till utgift

1. Klicka på den röda **"-"** knappen i verktygsfältet
2. Fyll i namnet på utgiften (t.ex. "Mat", "Hyra", "Transport")
3. Ange beloppet i svenska kronor
4. Klicka på "Lägg till utgift"

### Radera transaktioner

- Swipe från höger till vänster på en transaktion i listan
- Klicka på "Delete"

### Visa saldo

Saldot visas alltid högst upp i appen:
- **Grönt** om du har positiv balans
- **Rött** om du har negativ balans

## Projektstruktur

```
SaldoApp/
├── SaldoApp/
│   ├── SaldoAppApp.swift              # App entry point
│   ├── ContentView.swift              # Main view med saldo och transaktionslista
│   ├── Transaction.swift              # Data model för transaktioner
│   ├── TransactionViewModel.swift     # State management och beräkningar
│   ├── AddTransactionSheet.swift      # Dialog för att lägga till transaktioner
│   ├── Assets.xcassets/               # Bilder och färger
│   └── SaldoApp.entitlements          # App-rättigheter
└── README.md
```

## Teknologi

- **SwiftUI** - Moderna, deklarativa UI
- **Combine** - Reaktiv programmering med @Published
- **UserDefaults** - Enkel och pålitlig datalagring
- **macOS SDK** - Native macOS-funktionalitet

## Framtida förbättringar

Potentiella funktioner att lägga till:

- [ ] Kategorisering av inkomster/utgifter
- [ ] Diagram och grafer
- [ ] Export till CSV/PDF
- [ ] Filtrera efter datumintervall
- [ ] Sök i transaktioner
- [ ] Budgetmål och varningar
- [ ] iCloud-synkronisering
- [ ] Mörkt läge anpassningar
- [ ] Olika valutor

## Licens

Detta projekt är skapat som en demo och är fritt att använda och modifiera.

## Support

För frågor eller problem, kontakta utvecklaren eller skapa en issue i projektet.

---

**Tack för att du använder SaldoApp! 💰**
