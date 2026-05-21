"use client";

export function TrustSec (){
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-[#01462f] to-[#01291c]">
        <div className="max-w-5xl mx-auto bg-[#dfe8e3] rounded-[30px] p-14 text-center">
          <h2 className="text-[#2C2F31] text-4xl font-bold mb-5">
            Trust is Our Primary Material.
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-7 mb-12">
            Every user on PGFinder+ undergoes a rigorous multi-point
            verification process. Your data is encrypted, and transactions are
            held in secure escrow until you’re satisfied.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-[24px] text-center ">
              <h4 className="text-green-800 font-semibold mb-2">ID Verification</h4>
              <p className="text-sm text-gray-600">
                Government-grade identity checks for all members.
              </p>
            </div>

            <div className="p-[24px] text-center ">
              <h4 className="text-green-800 font-semibold mb-2">Secure Escrow</h4>
              <p className="text-sm text-gray-600">
                Deposits are safely held until move-in and confirm.
              </p>
            </div>

            <div className="p-[24px] text-center ">
              <h4 className="text-green-800 font-bold mb-2">24/7 Support</h4>
              <p className="text-sm text-gray-600">
                Real humans ready to help your every step.
              </p>
            </div>
          </div>
        </div>
      </section>
  );
}