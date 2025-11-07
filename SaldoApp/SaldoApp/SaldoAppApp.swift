//
//  SaldoAppApp.swift
//  SaldoApp
//
//  Created by Claude
//

import SwiftUI

@main
struct SaldoAppApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .windowStyle(.hiddenTitleBar)
        .windowResizability(.contentSize)
        .defaultSize(width: 700, height: 600)
        .commands {
            CommandGroup(replacing: .newItem) { }
        }
    }
}
