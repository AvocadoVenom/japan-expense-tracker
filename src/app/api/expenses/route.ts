import { adminDb } from "@/app/storage/storage-admin";
import { NextResponse } from "next/server";
import { Expense } from "../types/types";
import { isToday } from "date-fns";
import { Timestamp } from "firebase-admin/firestore";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const isFromToday = Boolean(url.searchParams.get("fromToday"));

  const snapshot = await adminDb.collection("Expense").get();

  let filteredDocs = snapshot.docs;
  if (isFromToday) {
    filteredDocs = snapshot.docs.filter((doc) =>
      isToday(doc.data().timestamp.toDate())
    );
  }

  const refinedExpenses: Expense[] = await Promise.all(
    filteredDocs.map(async (doc) => {
      const { expenseCategory, amount, timestamp } = doc.data();

      let ecData = null;
      if (expenseCategory) {
        const ecSnapshot = await expenseCategory.get();
        ecData = ecSnapshot.exists
          ? {
              id: expenseCategory.id,
              ...ecSnapshot.data(),
            }
          : null;
      }

      return {
        id: doc.id,
        amount,
        expenseCategory: ecData,
        timestamp: doc.data().timestamp.toDate(),
      };
    })
  );

  return NextResponse.json(refinedExpenses);
}

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();

    const { expenseCategory, amount, timestamp } = body;
    const categoryRef = adminDb
      .collection("ExpenseCategory")
      .doc(expenseCategory);

    await adminDb.collection("Expense").add({
      expenseCategory: categoryRef,
      amount,
      timestamp: Timestamp.fromDate(new Date()),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur API /expenses:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
