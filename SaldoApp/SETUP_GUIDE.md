# Snabbguide för att skapa SaldoApp i Xcode

Följ dessa steg för att få igång SaldoApp på din Mac.

## Metod 1: Skapa nytt Xcode-projekt (Rekommenderat)

### 1. Skapa projekt

Öppna Xcode och skapa ett nytt projekt:

```
File → New → Project...
```

Välj:
- **Platform:** macOS
- **Template:** App
- Klicka "Next"

### 2. Projektinställningar

- **Product Name:** SaldoApp
- **Team:** Din utvecklare-profil (eller None)
- **Organization Identifier:** com.yourname (valfritt)
- **Interface:** SwiftUI
- **Language:** Swift
- **Storage:** None
- **Include Tests:** Avmarkera

Klicka "Next" och välj en plats att spara projektet.

### 3. Kopiera källfilerna

Ta bort automatiskt skapade filer:
- `ContentView.swift`
- `SaldoAppApp.swift`

Kopiera alla Swift-filer från `SaldoApp/SaldoApp/` i detta repo till ditt nya Xcode-projekt:

**Dra och släpp filerna till Xcode:**
- `SaldoAppApp.swift`
- `ContentView.swift`
- `Transaction.swift`
- `TransactionViewModel.swift`
- `AddTransactionSheet.swift`

Välj "Copy items if needed" när du kopierar.

### 4. Kopiera Assets (Valfritt)

Du kan också kopiera `Assets.xcassets` mappen för att ersätta den automatiskt skapade.

### 5. Konfigurera deployment target

I Xcode:
1. Klicka på projektfilen (blå ikonen)
2. Välj "SaldoApp" under TARGETS
3. Gå till "General"
4. Under "Minimum Deployments" sätt till **macOS 14.0** eller senare

### 6. Bygg och kör

Tryck `Cmd + R` eller klicka på Play-knappen!

---

## Metod 2: Använd denna katalog direkt

⚠️ **OBS:** Denna metod kräver att du manuellt skapar en `.xcodeproj` fil vilket är mer komplext.

För en smidigare upplevelse, använd **Metod 1** ovan.

Om du ändå vill prova:

1. Öppna Terminal
2. Navigera till `SaldoApp/` katalogen
3. Kör: `xcodegen` (kräver att du har installerat [XcodeGen](https://github.com/yonaskolb/XcodeGen))

Eller skapa projektet manuellt via Metod 1 och kopiera filerna.

---

## Använd appen

När appen körs:

1. **Lägg till inkomst:** Klicka på den gröna ➕ knappen
2. **Lägg till utgift:** Klicka på den röda ➖ knappen
3. **Radera:** Swipe på en transaktion och tryck "Delete"

Allt sparas automatiskt!

---

## Felsökning

### Problem: "Cannot find type 'X' in scope"

**Lösning:** Kontrollera att alla 5 Swift-filer är tillagda till projektet och att de är markerade som "Target Membership: SaldoApp"

### Problem: "Minimum deployment target"

**Lösning:** Öka deployment target till macOS 14.0 (Sonoma) eller senare i projektinställningarna.

### Problem: Appen bygger men startar inte

**Lösning:** Kontrollera att `SaldoAppApp.swift` har `@main` attributet och att `ContentView` är korrekt importerad.

---

## Behöver hjälp?

Se [README.md](README.md) för mer information om funktioner och användning.
