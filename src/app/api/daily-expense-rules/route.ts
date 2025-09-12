import { adminDb } from "@/app/storage/storage-admin";
import { NextResponse } from "next/server";
import { DailyExpenseRule } from "../types/types";

export async function GET() {
  const snapshot = await adminDb.collection("DailyExpenseRule").get();
  const rulesWithExpenseCategory: DailyExpenseRule[] = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const { expenseCategory, maxAmount } = doc.data();

      let ecData = null;
      if (expenseCategory) {
        const ecSnapshot = await expenseCategory.get();
        ecData = ecSnapshot.exists
          ? { id: expenseCategory.id, ...ecSnapshot.data() }
          : null;
      }

      return { id: doc.id, maxAmount: maxAmount, expenseCategory: ecData };
    })
  );

  return NextResponse.json(rulesWithExpenseCategory);
}
