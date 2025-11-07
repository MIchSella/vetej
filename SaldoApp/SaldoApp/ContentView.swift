//
//  ContentView.swift
//  SaldoApp
//
//  Created by Claude
//

import SwiftUI

struct ContentView: View {
    @StateObject private var viewModel = TransactionViewModel()
    @State private var showingAddIncome = false
    @State private var showingAddExpense = false

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                // Balance Card
                balanceCard
                    .padding()

                // Transactions List
                if viewModel.transactions.isEmpty {
                    emptyState
                } else {
                    transactionsList
                }
            }
            .navigationTitle("Saldo")
            .toolbar {
                ToolbarItemGroup {
                    Button(action: { showingAddIncome = true }) {
                        Label("Lägg till inkomst", systemImage: "plus.circle.fill")
                            .foregroundColor(.green)
                    }
                    .help("Lägg till inkomst")

                    Button(action: { showingAddExpense = true }) {
                        Label("Lägg till utgift", systemImage: "minus.circle.fill")
                            .foregroundColor(.red)
                    }
                    .help("Lägg till utgift")
                }
            }
            .sheet(isPresented: $showingAddIncome) {
                AddTransactionSheet(viewModel: viewModel, type: .income)
            }
            .sheet(isPresented: $showingAddExpense) {
                AddTransactionSheet(viewModel: viewModel, type: .expense)
            }
        }
    }

    private var balanceCard: some View {
        VStack(spacing: 12) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text("Totalt saldo")
                        .font(.subheadline)
                        .foregroundColor(.secondary)

                    Text("\(viewModel.balance, specifier: "%.2f") kr")
                        .font(.system(size: 36, weight: .bold))
                        .foregroundColor(viewModel.balance >= 0 ? .green : .red)
                }

                Spacer()
            }

            Divider()

            HStack(spacing: 40) {
                VStack(alignment: .leading, spacing: 4) {
                    Text("Inkomster")
                        .font(.subheadline)
                        .foregroundColor(.secondary)

                    Text("\(viewModel.totalIncome, specifier: "%.2f") kr")
                        .font(.title3)
                        .fontWeight(.semibold)
                        .foregroundColor(.green)
                }

                VStack(alignment: .leading, spacing: 4) {
                    Text("Utgifter")
                        .font(.subheadline)
                        .foregroundColor(.secondary)

                    Text("\(viewModel.totalExpenses, specifier: "%.2f") kr")
                        .font(.title3)
                        .fontWeight(.semibold)
                        .foregroundColor(.red)
                }

                Spacer()
            }
        }
        .padding()
        .background(Color(NSColor.controlBackgroundColor))
        .cornerRadius(12)
    }

    private var emptyState: some View {
        VStack(spacing: 16) {
            Image(systemName: "chart.line.uptrend.xyaxis")
                .font(.system(size: 60))
                .foregroundColor(.secondary)

            Text("Inga transaktioner ännu")
                .font(.title2)
                .fontWeight(.semibold)

            Text("Lägg till inkomster och utgifter för att börja")
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    private var transactionsList: some View {
        List {
            ForEach(viewModel.transactions) { transaction in
                TransactionRow(transaction: transaction)
            }
            .onDelete(perform: viewModel.deleteTransactions)
        }
        .listStyle(.inset)
    }
}

struct TransactionRow: View {
    let transaction: Transaction

    var body: some View {
        HStack {
            Image(systemName: transaction.type == .income ? "arrow.down.circle.fill" : "arrow.up.circle.fill")
                .foregroundColor(transaction.type == .income ? .green : .red)
                .font(.title2)

            VStack(alignment: .leading, spacing: 4) {
                Text(transaction.name)
                    .font(.headline)

                Text(transaction.date, style: .date)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }

            Spacer()

            Text("\(transaction.type == .income ? "+" : "-")\(transaction.amount, specifier: "%.2f") kr")
                .font(.headline)
                .foregroundColor(transaction.type == .income ? .green : .red)
        }
        .padding(.vertical, 4)
    }
}

#Preview {
    ContentView()
}
