"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePeriodData = exports.generateLastMonthsData = exports.generatedLast12MonthData = void 0;
//! Generate last 12 month
// export async function generatedLast12MonthData<T>(
//   model: Model<T>,
// ): Promise<{ last12Months: MonthData[] }> {
//   const last12Months: MonthData[] = [];
//   const currentDate = new Date();
//   currentDate.setDate(currentDate.getDate() + 1);
//   for (let i = 11; i >= 0; i--) {
//     const endDate = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate() - i * 28,
//     );
//     const startDate = new Date(
//       endDate.getFullYear(),
//       endDate.getMonth(),
//       endDate.getDate() - 28,
//     );
//     const monthYear = endDate.toLocaleString('default', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric',
//     });
//     const count = await model.countDocuments({
//       createdAt: {
//         $gte: startDate,
//         $lt: endDate,
//       },
//     });
//     last12Months.push({ month: monthYear, count });
//   }
//   return { last12Months };
// }
//!
function generatedLast12MonthData(model) {
    return __awaiter(this, void 0, void 0, function* () {
        const last12MonthsData = [];
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        for (let i = 11; i >= 0; i--) {
            const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, currentDate.getDate());
            const startDate = new Date(endDate);
            startDate.setMonth(endDate.getMonth() - 1);
            const monthYear = endDate.toLocaleString('default', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            });
            const count = yield model.countDocuments({
                createdAt: {
                    $gte: startDate,
                    $lt: endDate,
                },
            });
            last12MonthsData.push({ month: monthYear, count });
        }
        return { last12MonthsData };
    });
}
exports.generatedLast12MonthData = generatedLast12MonthData;
//! Last month
// export async function generateLastOneMonthData<T>(
//   model: Model<T>,
// ): Promise<{ lastOneMonth: MonthData[] }> {
//   const lastOneMonth: MonthData[] = [];
//   const currentDate = new Date();
//   currentDate.setDate(currentDate.getDate() + 1);
//   // Calculate start and end dates for the last one month
//   const endDate = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth(),
//     currentDate.getDate(),
//   );
//   const startDate = new Date(
//     endDate.getFullYear(),
//     endDate.getMonth(),
//     endDate.getDate() - 28,
//   );
//   const monthYear = endDate.toLocaleString('default', {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric',
//   });
//   const count = await model.countDocuments({
//     createdAt: {
//       $gte: startDate,
//       $lt: endDate,
//     },
//   });
//   lastOneMonth.push({ month: monthYear, count });
//   return { lastOneMonth };
// }
//!
function generateLastMonthsData(model, numberOfMonths) {
    return __awaiter(this, void 0, void 0, function* () {
        const lastMonthsData = [];
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        // Calculate start and end dates for the last 'numberOfMonths' months
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 28 * numberOfMonths);
        // Loop through each month
        for (let i = 0; i < numberOfMonths; i++) {
            const startDateOfMonth = new Date(startDate);
            const endDateOfMonth = new Date(endDate);
            startDateOfMonth.setMonth(startDate.getMonth() + i);
            endDateOfMonth.setMonth(endDate.getMonth() + i);
            const monthYear = endDateOfMonth.toLocaleString('default', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            });
            const count = yield model.countDocuments({
                createdAt: {
                    $gte: startDateOfMonth,
                    $lt: endDateOfMonth,
                },
            });
            lastMonthsData.push({ month: monthYear, count });
        }
        return { lastMonthsData };
    });
}
exports.generateLastMonthsData = generateLastMonthsData;
//! Day and week
// export async function generatePeriodData<T>(
//   model: Model<T>,
//   periodInDays: number,
// ): Promise<{ periodData: PeriodData[] }> {
//   const periodData: PeriodData[] = [];
//   const currentDate = new Date();
//   currentDate.setDate(currentDate.getDate() + 1);
//   for (let i = periodInDays - 1; i >= 0; i--) {
//     const endDate = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate() - i,
//     );
//     const startDate = new Date(
//       endDate.getFullYear(),
//       endDate.getMonth(),
//       endDate.getDate() - 1,
//     );
//     const period = endDate.toLocaleString('default', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric',
//     });
//     const count = await model.countDocuments({
//       createdAt: {
//         $gte: startDate,
//         $lt: endDate,
//       },
//     });
//     periodData.push({ period, count });
//   }
//   return { periodData };
// }
//!
function generatePeriodData(model, periodInDays) {
    return __awaiter(this, void 0, void 0, function* () {
        const periodData = [];
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set time to the exact start of the day
        for (let i = periodInDays - 1; i >= 0; i--) {
            const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i, 23, 59, 59, 999);
            const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 1, 0, 0, 0, 0);
            const period = endDate.toLocaleString('default', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            });
            console.log('StartDate:', startDate.toISOString());
            console.log('EndDate:', endDate.toISOString());
            const count = yield model.countDocuments({
                createdAt: {
                    $gte: startDate,
                    $lt: endDate,
                },
            });
            console.log('Count:', count);
            periodData.push({ period, count });
        }
        return { periodData };
    });
}
exports.generatePeriodData = generatePeriodData;
