import { adminDb } from "@/app/storage/storage-admin";
import { NextResponse } from "next/server";
import { ExpenseCategory } from "../types/types";

export async function GET() {
  const snapshot = await adminDb.collection("ExpenseCategory").get();
  const expenseCategories: ExpenseCategory[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
  }));

  return NextResponse.json(expenseCategories);
}
