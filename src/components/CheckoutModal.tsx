import React, { useState } from 'react';
import { X, Check, Lock, ShieldCheck, QrCode, CreditCard, Sparkles, Download, ArrowRight, Copy, CheckCheck } from 'lucide-react';
import { PricingPlan } from '../types';
import { PRICING_PLANS } from '../data/content';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PricingPlan | null;
  onSelectPlan: (plan: PricingPlan) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
  onSelectPlan,
}) => {
  const [basicPlan, premiumPlan] = PRICING_PLANS;
  const currentPlan = selectedPlan || premiumPlan;

  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopyPix = () => {
    setIsCopied(true);
    navigator.clipboard?.writeText(
      '00020126580014br.gov.bcb.pix0136bonecasdepapel-digital-pagamento@pix.com520400005303986540524.905802BR5925BONECAS DE PAPEL DIGITAL6009SAO PAULO62070503***6304E8A2'
    );
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPlan.checkoutUrl) {
      window.location.href = currentPlan.checkoutUrl;
      return;
    }
    setIsSuccess(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden my-4 border border-pink-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#FF007A] via-[#E11D74] to-[#C026D3] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <div>
              <h3 className="text-base sm:text-lg font-black leading-tight">
                Finalizar Acesso às Bonecas
              </h3>
              <p className="text-xs text-pink-100 font-medium">
                Envio imediato no seu e-mail logo após a confirmação
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
          {isSuccess ? (
            /* Success confirmation screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h4 className="text-2xl font-black text-slate-900">
                Parabéns! Pedido Confirmado! 🎉
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Enviamos o link de download e a área de membros para{' '}
                <strong className="text-slate-900">{email || 'seu e-mail'}</strong>.
              </p>

              <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 text-left space-y-2 mt-4">
                <span className="text-xs font-black text-pink-800 uppercase block">
                  Acesso Imediato:
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Você já pode baixar o arquivo PDF completo e começar a imprimir as bonecas para sua filha agora mesmo!
                </p>
                <a
                  href="#download-demo"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Download simulado iniciado! Os PDFs estão prontos.');
                  }}
                  className="mt-2 w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Arquivo PDF de Demonstração</span>
                </a>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition"
              >
                Voltar à página
              </button>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Plan Switcher Pills */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                  1. Escolha o Pacote:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectPlan(basicPlan)}
                    className={`p-3 rounded-2xl border-2 text-left transition cursor-pointer ${
                      currentPlan.id === 'basic'
                        ? 'border-pink-600 bg-pink-50/70 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-800">Básico</span>
                      <span className="text-xs font-black text-slate-900">R$ 9,90</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-0.5">+200 Bonecas</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectPlan(currentPlan.id === 'alegria_special' ? currentPlan : premiumPlan)}
                    className={`p-3 rounded-2xl border-2 text-left relative transition cursor-pointer ${
                      currentPlan.id === 'premium' || currentPlan.id === 'alegria_special'
                        ? 'border-pink-600 bg-pink-50/70 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="absolute -top-2 right-2 bg-yellow-400 text-slate-900 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">
                      {currentPlan.id === 'alegria_special' ? 'Oferta R$ 16,90' : 'Mais Escolhido'}
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-800">
                        {currentPlan.id === 'alegria_special' ? 'Pacote Alegria' : 'Pacote Alegria'}
                      </span>
                      <span className="text-xs font-black text-emerald-600">
                        R$ {currentPlan.id === 'alegria_special' ? '16,90' : '24,90'}
                      </span>
                    </div>
                    <span className="text-[10px] text-pink-700 font-bold block mt-0.5">
                      {currentPlan.id === 'alegria_special' ? '🔥 Super Desconto Ativado' : '+500 + Cenários + Pets'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Personal Data */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                  2. Seus Dados para Envio:
                </label>
                <div className="space-y-2">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Seu nome completo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-pink-500 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Seu melhor e-mail (para receber os PDFs)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-pink-500 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="WhatsApp / Telefone (para suporte)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-pink-500 text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Switcher */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                  3. Forma de Pagamento:
                </label>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`py-2 px-3 rounded-xl border-2 flex items-center justify-center gap-1.5 text-xs font-bold transition cursor-pointer ${
                      paymentMethod === 'pix'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-emerald-600" />
                    <span>PIX (Acesso Imediato)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-3 rounded-xl border-2 flex items-center justify-center gap-1.5 text-xs font-bold transition cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-pink-500 bg-pink-50 text-pink-800'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-pink-600" />
                    <span>Cartão de Crédito</span>
                  </button>
                </div>

                {paymentMethod === 'pix' ? (
                  <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 text-center space-y-3">
                    <span className="text-xs font-bold text-emerald-800 block">
                      Pague com PIX e receba o material em menos de 1 minuto!
                    </span>

                    {/* Simulated Pix QR Code Box */}
                    <div className="w-32 h-32 bg-white p-2 rounded-xl mx-auto shadow-xs border border-emerald-200 flex flex-col items-center justify-center">
                      <QrCode className="w-24 h-24 text-slate-800" />
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopyPix}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
                      >
                        {isCopied ? (
                          <>
                            <CheckCheck className="w-3.5 h-3.5" />
                            <span>Código PIX Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar Código PIX</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <input
                      type="text"
                      placeholder="Número do Cartão (ex: 4532 ...)"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Validade (MM/AA)"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Security & Total */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-sm font-bold text-slate-800 mb-3">
                  <span>Valor Total:</span>
                  <span className="text-xl font-black text-emerald-600">
                    R$ {currentPlan.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl font-black text-base shadow-lg shadow-emerald-500/30 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>PAGAR AGORA E RECEBER ARQUIVOS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 mt-2 font-medium">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>Ambiente Criptografado de 256 bits · Garantia de 7 Dias</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
