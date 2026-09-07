'use client';

import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { upsertProduct, deleteProduct } from '@/actions/products';
import { Plus, Trash2, Pencil, X, Check, MessageCircle, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { ImageUpload } from '@/components/admin/image-upload';
import { Project } from '@/types/database';

interface ProductsManagerProps {
  initialProducts: Project[];
}

export function ProductsManager({ initialProducts }: ProductsManagerProps) {
  const [editingItem, setEditingItem] = useState<Project | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const formElementRef = useRef<HTMLFormElement>(null);

  // Live preview states
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [period, setPeriod] = useState('');
  const [badge, setBadge] = useState('');
  const [description, setDescription] = useState('');
  const [featuresText, setFeaturesText] = useState('');

  const handleEdit = (item: Project) => {
    setEditingItem(item);
    setTitle(item.title || '');
    setPrice(item.client_name || '');
    setPeriod(item.outcome_description || '');
    setBadge(item.category || '');
    setDescription(item.short_description || '');
    setFeaturesText(
      item.tech_stack
        ? Array.isArray(item.tech_stack)
          ? item.tech_stack.join('\n')
          : String(item.tech_stack)
        : ''
    );
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCancel = () => {
    formElementRef.current?.reset();
    setEditingItem(null);
    setTitle('');
    setPrice('');
    setPeriod('');
    setBadge('');
    setDescription('');
    setFeaturesText('');
    setFormKey((k) => k + 1);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-[#e6005c] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Products &amp; Pricing Plans CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Products &amp; Software Plans
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
            Add, update, or price software trading algorithms, server packages, and SaaS products.
          </p>
        </div>
      </div>

      {/* Add / Edit Product Plan Form */}
      <div ref={scrollRef}>
        <Card className={`p-6 sm:p-8 bg-white rounded-3xl border transition-all shadow-sm ${
          editingItem ? 'border-[#e6005c] ring-2 ring-[#e6005c]/15 shadow-md' : 'border-slate-200/90'
        }`}>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              {editingItem ? (
                <>
                  <div className="w-8 h-8 rounded-xl bg-pink-100 text-[#e6005c] flex items-center justify-center">
                    <Pencil className="w-4 h-4" />
                  </div>
                  <span>Edit Product: <span className="text-[#e6005c]">{editingItem.title}</span></span>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span>Add New Product / Plan</span>
                </>
              )}
            </h2>

            {editingItem && (
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel Edit</span>
              </button>
            )}
          </div>

          <form
            ref={formElementRef}
            key={`product-form-${editingItem?.id || 'new'}-${formKey}`}
            action={async (formData) => {
              setIsSubmitting(true);
              try {
                await upsertProduct(formData);
                handleCancel();
              } catch (err) {
                console.error(err);
              } finally {
                setIsSubmitting(false);
              }
            }}
            className="space-y-5"
          >
            {editingItem && (
              <input type="hidden" name="id" value={editingItem.id} />
            )}

            {/* Row 1: Product Name & Badge */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Product / Plan Name <span className="text-[#e6005c]">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={editingItem?.title || ''}
                  placeholder="e.g. Manual Algo, Auto Without Server, Auto With Server"
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#e6005c] focus:outline-none bg-slate-50/50 hover:bg-white transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Badge / Ribbon Tag
                </label>
                <input
                  type="text"
                  name="badge"
                  defaultValue={editingItem?.category || ''}
                  placeholder="e.g. Most Popular for Starters, BEST VALUE, Fully Hands-Free"
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#e6005c] focus:outline-none bg-slate-50/50 hover:bg-white transition-all font-medium"
                />
              </div>
            </div>

            {/* Row 2: Price & Billing Suffix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Price <span className="text-[#e6005c]">*</span>
                </label>
                <input
                  type="text"
                  name="price"
                  required
                  defaultValue={editingItem?.client_name || '₹999'}
                  placeholder="e.g. ₹999, ₹3,999, ₹6,000"
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#e6005c] focus:outline-none bg-slate-50/50 hover:bg-white transition-all font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Billing Period / Tax Note
                </label>
                <input
                  type="text"
                  name="period"
                  defaultValue={editingItem?.outcome_description || '+ GST'}
                  placeholder="e.g. + GST, / year, + GST / year, one-time"
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#e6005c] focus:outline-none bg-slate-50/50 hover:bg-white transition-all font-medium"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Short Description
              </label>
              <textarea
                name="description"
                rows={2}
                defaultValue={editingItem?.short_description || ''}
                placeholder="e.g. Best for beginners to learn signals & manual execution. One-time setup support."
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#e6005c] focus:outline-none bg-slate-50/50 hover:bg-white transition-all font-normal"
              />
            </div>

            {/* Product Cover Image Upload */}
            <ImageUpload
              key={editingItem ? `thumb-${editingItem.id}` : 'thumb-new'}
              name="thumbnail_url"
              label="Product Showcase / Cover Image"
              defaultValue={editingItem?.thumbnail_url}
              aspectRatio="video"
              helperText="Upload or choose the 3D graphic displayed on the product card header."
            />

            {/* Features (One per line) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>Features List (One bullet point per line)</span>
                <span className="text-[11px] text-slate-400 font-normal">e.g. TradingView Signals</span>
              </label>
              <textarea
                name="features"
                rows={3}
                defaultValue={
                  editingItem?.tech_stack
                    ? Array.isArray(editingItem.tech_stack)
                      ? editingItem.tech_stack.join('\n')
                      : String(editingItem.tech_stack)
                    : '100% Auto Trading\nWhatsApp Support\nBeginner Friendly'
                }
                placeholder="TradingView Signals&#10;WhatsApp Support&#10;Beginner Friendly"
                onChange={(e) => setFeaturesText(e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#e6005c] focus:outline-none bg-slate-50/50 hover:bg-white transition-all font-mono"
              />
            </div>

            {/* Row 3: Action URLs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Buy Now Link / URL
                </label>
                <input
                  type="text"
                  name="buy_url"
                  defaultValue={editingItem?.live_url || '/contact'}
                  placeholder="https://... or /contact or UPI link"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#e6005c] focus:outline-none bg-slate-50/50 hover:bg-white transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  WhatsApp Enquiry Text
                </label>
                <input
                  type="text"
                  name="whatsapp_text"
                  defaultValue={editingItem?.challenge_description || 'Hello, I want to know more about this plan'}
                  placeholder="e.g. Hello, I would like to buy Manual Algo plan"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#e6005c] focus:outline-none bg-slate-50/50 hover:bg-white transition-all font-medium"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 text-xs text-slate-800 font-bold cursor-pointer">
                <input
                  type="checkbox"
                  name="is_published"
                  defaultChecked={editingItem ? editingItem.is_published : true}
                  className="w-4 h-4 rounded text-[#e6005c] accent-[#e6005c]"
                />
                <span>Published on Website</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-800 font-bold cursor-pointer">
                <input
                  type="checkbox"
                  name="is_featured"
                  defaultChecked={editingItem ? editingItem.is_featured : true}
                  className="w-4 h-4 rounded text-[#e6005c] accent-[#e6005c]"
                />
                <span>Highlight as Best Value / Featured</span>
              </label>
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="px-7 py-3 text-xs sm:text-sm font-bold bg-[#e6005c] hover:bg-[#cc0052] text-white rounded-full shadow-md shadow-pink-500/25 cursor-pointer"
              >
                {isSubmitting
                  ? editingItem
                    ? 'Updating Plan...'
                    : 'Saving Plan...'
                  : editingItem
                  ? 'Update Product Plan'
                  : 'Save Product Plan'}
              </Button>

              {editingItem && (
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="rounded-full text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>

      {/* Existing Products & Plans List */}
      <Card className="p-6 sm:p-8 bg-white border border-slate-200/90 rounded-3xl shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Current Products &amp; Pricing Plans ({initialProducts?.length || 0})
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              These plans are rendered on the public website under Choose Your Plan.
            </p>
          </div>
        </div>

        {!initialProducts || initialProducts.length === 0 ? (
          <div className="text-xs text-slate-500 py-12 text-center bg-slate-50/60 rounded-2xl border border-dashed border-slate-200">
            <Tag className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <div className="font-bold text-slate-700">No Product Plans Added Yet</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Add your first software plan above to display it on the website.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialProducts.map((plan) => {
              const featuresList = plan.tech_stack
                ? Array.isArray(plan.tech_stack)
                  ? plan.tech_stack
                  : String(plan.tech_stack).split(',')
                : [];

              return (
                <div
                  key={plan.id}
                  className={`bg-white rounded-3xl border p-6 flex flex-col justify-between relative transition-all duration-200 ${
                    plan.is_featured
                      ? 'border-blue-300 ring-2 ring-blue-500/20 shadow-lg'
                      : 'border-slate-200/90 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  {/* Badge */}
                  {plan.category && (
                    <div className="mb-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                        plan.is_featured
                          ? 'bg-blue-600 text-white'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {plan.category}
                      </span>
                    </div>
                  )}

                  {/* Plan Name & Price */}
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">
                      {plan.title}
                    </h3>
                    
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-2xl sm:text-3xl font-black text-slate-900">
                        {plan.client_name || '₹999'}
                      </span>
                      {plan.outcome_description && (
                        <span className="text-xs text-slate-500 font-medium">
                          {plan.outcome_description}
                        </span>
                      )}
                    </div>

                    {plan.short_description && (
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed font-normal">
                        {plan.short_description}
                      </p>
                    )}

                    {/* Features list */}
                    {featuresList.length > 0 && (
                      <ul className="space-y-2 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-700">
                        {featuresList.map((f: string, fIdx: number) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] flex-shrink-0" />
                            <span className="font-medium">{f.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <Badge variant={plan.is_published ? 'emerald' : 'outline'}>
                        {plan.is_published ? 'Live' : 'Draft'}
                      </Badge>
                      {plan.is_featured && <Badge variant="pink">Best Value</Badge>}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(plan)}
                        className="text-slate-700 hover:text-[#e6005c] hover:border-pink-300 flex items-center gap-1 text-xs cursor-pointer"
                        title="Edit Plan"
                      >
                        <Pencil className="w-3 h-3" />
                        <span>Edit</span>
                      </Button>

                      <form action={async () => { await deleteProduct(plan.id); }}>
                        <Button
                          type="submit"
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 cursor-pointer"
                          title="Delete Plan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </form>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </Card>

    </div>
  );
}
