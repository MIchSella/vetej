//
//  Transaction.swift
//  SaldoApp
//
//  Created by Claude
//

import Foundation

enum TransactionType: String, Codable {
    case income = "Inkomst"
    case expense = "Utgift"
}

struct Transaction: Identifiable, Codable {
    let id: UUID
    let name: String
    let amount: Double
    let type: TransactionType
    let date: Date

    init(id: UUID = UUID(), name: String, amount: Double, type: TransactionType, date: Date = Date()) {
        self.id = id
        self.name = name
        self.amount = amount
        self.type = type
        self.date = date
    }

    /// Returns the signed amount (positive for income, negative for expense)
    var signedAmount: Double {
        type == .income ? amount : -amount
    }
}
