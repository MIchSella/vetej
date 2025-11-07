//
//  AddTransactionSheet.swift
//  SaldoApp
//
//  Created by Claude
//

import SwiftUI

struct AddTransactionSheet: View {
    @Environment(\.dismiss) var dismiss
    @ObservedObject var viewModel: TransactionViewModel

    let type: TransactionType

    @State private var name: String = ""
    @State private var amount: String = ""
    @FocusState private var focusedField: Field?

    enum Field {
        case name, amount
    }

    var body: some View {
        VStack(spacing: 20) {
            // Header
            Text(type == .income ? "Lägg till inkomst" : "Lägg till utgift")
                .font(.title2)
                .fontWeight(.semibold)

            // Form fields
            VStack(alignment: .leading, spacing: 15) {
                VStack(alignment: .leading, spacing: 5) {
                    Text("Namn")
                        .font(.headline)
                        .foregroundColor(.secondary)

                    TextField("T.ex. Lön, Mat, Hyra...", text: $name)
                        .textFieldStyle(.roundedBorder)
                        .focused($focusedField, equals: .name)
                }

                VStack(alignment: .leading, spacing: 5) {
                    Text("Belopp (kr)")
                        .font(.headline)
                        .foregroundColor(.secondary)

                    TextField("0.00", text: $amount)
                        .textFieldStyle(.roundedBorder)
                        .focused($focusedField, equals: .amount)
                }
            }
            .padding(.horizontal)

            // Buttons
            HStack(spacing: 12) {
                Button("Avbryt") {
                    dismiss()
                }
                .keyboardShortcut(.cancelAction)

                Button(type == .income ? "Lägg till inkomst" : "Lägg till utgift") {
                    addTransaction()
                }
                .keyboardShortcut(.defaultAction)
                .disabled(!isValid)
            }
            .padding(.top)
        }
        .padding(24)
        .frame(width: 400)
        .onAppear {
            focusedField = .name
        }
    }

    private var isValid: Bool {
        !name.trimmingCharacters(in: .whitespaces).isEmpty &&
        Double(amount.replacingOccurrences(of: ",", with: ".")) != nil
    }

    private func addTransaction() {
        guard isValid,
              let amountValue = Double(amount.replacingOccurrences(of: ",", with: ".")) else {
            return
        }

        let transaction = Transaction(
            name: name.trimmingCharacters(in: .whitespaces),
            amount: amountValue,
            type: type
        )

        viewModel.addTransaction(transaction)
        dismiss()
    }
}
