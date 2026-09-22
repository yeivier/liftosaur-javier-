import type { JSX } from "react";
import { Translate_text } from "../../i18n/translate";
import { IAccount } from "../../models/account";
import type { ICreatorStats } from "../../../lambda/userAffiliates";

export interface IUserAffiliatesSummary {
  totalUsers: number;
  signedUpUsers: number;
  paidUsers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  programUsers: number;
  couponUsers: number;
  programRevenue: number;
  couponRevenue: number;
}

export interface IUserAffiliatesContentProps {
  client: Window["fetch"];
  account: IAccount | undefined;
  creatorStats: ICreatorStats;
}

export function UserAffiliatesContent(props: IUserAffiliatesContentProps): JSX.Element {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  };
  const { summary, monthlyPayments } = props.creatorStats;

  return (
    <section className="py-8">
      <h1 className="mb-8 text-3xl font-bold">{Translate_text("Affiliate Program")}</h1>

      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
          <div className="mb-1 text-sm text-gray-600">{Translate_text("Total Users")}</div>
          <div className="text-3xl font-bold text-gray-900">{summary.totalUsers}</div>
          <div className="mt-1 text-xs text-gray-500">
            <span className="text-blue-700">{summary.programUsers}</span>
            {Translate_text(" programs,")} <span className="text-purple-700">{summary.couponUsers}</span>
            {Translate_text(" coupons")}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            (<span className="text-green-700">{summary.signedUpUsers}</span>
            {Translate_text(" signed up,")}{" "}
            <span className="text-red-700">{summary.totalUsers - summary.signedUpUsers}</span>
            {Translate_text(" not)")}
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
          <div className="mb-1 text-sm text-gray-600">{Translate_text("Paying Users")}</div>
          <div className="text-3xl font-bold text-green-600">{summary.paidUsers}</div>
          <div className="mt-1 text-xs text-gray-500">
            {summary.totalUsers > 0
              ? `${((summary.paidUsers / summary.totalUsers) * 100).toFixed(1)}% conversion`
              : "No users yet"}
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
          <div className="mb-1 text-sm text-gray-600">{Translate_text("This Month")}</div>
          <div className="text-3xl font-bold text-blue-600">{formatCurrency(summary.monthlyRevenue)}</div>
          <div className="mt-1 text-xs text-gray-500">{Translate_text("Your 20% share")}</div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
          <div className="mb-1 text-sm text-gray-600">{Translate_text("Total Earnings")}</div>
          <div className="text-3xl font-bold text-purple-600">{formatCurrency(summary.totalRevenue)}</div>
          <div className="mt-1 text-xs text-gray-500">
            <span className="text-blue-700">{formatCurrency(summary.programRevenue)}</span>
            {Translate_text(" programs,")}{" "}
            <span className="text-purple-700">{formatCurrency(summary.couponRevenue)}</span>
            {Translate_text(" coupons")}
          </div>
        </div>
      </div>

      {/* Payments by Month */}
      <div className="mb-8 overflow-hidden bg-white rounded-lg shadow">
        <div className="px-4 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">{Translate_text("Payments by Month")}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  {Translate_text("Month")}
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  {Translate_text("Number of Payments")}
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  {Translate_text("Program Users")}
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  {Translate_text("Coupon Users")}
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  {Translate_text("Revenue (20% share)")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {monthlyPayments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                    {Translate_text("No payments yet")}
                  </td>
                </tr>
              ) : (
                monthlyPayments.map((monthData) => {
                  const [year, month] = monthData.month.split("-");
                  const monthName = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      year: "numeric",
                    }
                  );
                  return (
                    <tr key={monthData.month} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{monthName}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{monthData.count}</td>
                      <td className="px-4 py-4 text-sm text-blue-700 whitespace-nowrap">
                        {monthData.programUsersTotal}
                        {monthData.programUsers > 0 && (
                          <span className="text-gray-400"> (+{monthData.programUsers})</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-purple-700 whitespace-nowrap">
                        {monthData.couponUsersTotal}
                        {monthData.couponUsers > 0 && (
                          <span className="text-gray-400"> (+{monthData.couponUsers})</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {formatCurrency(monthData.revenue)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">{Translate_text("How the Affiliate Program Works")}</h2>

        <div className="p-6 border border-blue-200 rounded-lg bg-blue-50">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-sm font-bold text-white bg-blue-500 rounded-full">
                1
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">{Translate_text("Share Your Programs & Coupons")}</h3>
                <p className="text-sm text-blue-800">
                  {Translate_text(
                    "When users import your published programs or use your coupons, they're automatically linked to your affiliate account."
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-sm font-bold text-white bg-blue-500 rounded-full">
                2
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">{Translate_text("Users Subscribe")}</h3>
                <p className="text-sm text-blue-800">
                  {Translate_text("When affiliated users purchase subscriptions or make payments ")}
                  <strong>{Translate_text("after")}</strong>
                  {Translate_text(" importing your program or using your coupon, you earn 20% of their payments.")}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-sm font-bold text-white bg-blue-500 rounded-full">
                3
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">{Translate_text("Earn Forever")}</h3>
                <p className="text-sm text-blue-800">
                  {Translate_text(
                    "You continue earning 20% from subscription renewals and future purchases for as long as the user remains subscribed."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border border-yellow-200 rounded-lg bg-yellow-50">
        <h3 className="mb-2 text-sm font-semibold text-yellow-900">{Translate_text("Important Notes:")}</h3>
        <ul className="space-y-1 text-sm text-yellow-800">
          <li>
            {Translate_text("• Only payments made ")}
            <strong>{Translate_text("after")}</strong>
            {Translate_text(" importing your program or using your coupon count toward commissions")}
          </li>
          <li>
            {Translate_text("• If a user imports multiple programs or uses multiple coupons, only the ")}
            <strong>{Translate_text("first")}</strong>
            {Translate_text(" affiliate gets the commission")}
          </li>
          <li>{Translate_text("• Refunded payments are excluded from commission calculations")}</li>
          <li>{Translate_text("• Revenue share applies to both one-time purchases and recurring subscriptions")}</li>
        </ul>
      </div>

      {summary.totalUsers === 0 && (
        <div className="p-8 mt-8 text-center rounded-lg bg-gray-50">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">{Translate_text("No affiliated users yet")}</h3>
          <p className="mb-4 text-gray-600">
            {Translate_text("Start earning by creating and sharing great workout programs!")}
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>{Translate_text("• Publish your programs to make them discoverable")}</p>
            <p>{Translate_text("• Share your program links on social media")}</p>
            <p>{Translate_text("• Build a community around your training philosophy")}</p>
          </div>
        </div>
      )}
    </section>
  );
}
