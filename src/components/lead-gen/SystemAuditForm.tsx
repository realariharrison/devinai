'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, ArrowRight, Loader2, Check, CheckCircle2 } from 'lucide-react';
import { ProgressIndicator } from './ProgressIndicator';
import { cn } from '@/lib/utils';

// Form schema
const systemAuditSchema = z.object({
  // Step 1: Contact Info
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  role: z.string().min(2, 'Please enter your role'),

  // Step 2: Challenge
  current_challenge: z.string().min(20, 'Please describe your challenge in at least 20 characters'),

  // Step 3: Tech Stack
  team_size: z.string().min(1, 'Please select your team size'),
  tech_stack: z.array(z.string()).min(1, 'Please select at least one technology'),

  // Step 4: Desired Outcomes
  desired_outcomes: z.array(z.string()).min(1, 'Please select at least one desired outcome'),
  budget_range: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
});

type SystemAuditFormData = z.infer<typeof systemAuditSchema>;

const steps = [
  { id: 1, label: 'Contact' },
  { id: 2, label: 'Challenge' },
  { id: 3, label: 'Tech Stack' },
  { id: 4, label: 'Outcomes' },
];

const teamSizeOptions = [
  '1-5',
  '5-10',
  '10-20',
  '20-50',
  '50+',
];

const techStackOptions = [
  'React',
  'Next.js',
  'Vue',
  'Angular',
  'Node.js',
  'Python',
  'PHP',
  'Ruby',
  'Java',
  '.NET',
  'Go',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Supabase',
  'Firebase',
  'AWS',
  'Azure',
  'Vercel',
  'Other',
];

const outcomeOptions = [
  'Reduce development costs',
  'Improve feature velocity',
  'Scale for growth',
  'Modernize legacy systems',
  'Integrate AI capabilities',
  'Improve system reliability',
  'Reduce technical debt',
  'Better developer experience',
];

const budgetOptions = [
  'Under $25K',
  '$25K - $50K',
  '$50K - $100K',
  '$100K - $250K',
  '$250K+',
];

const timelineOptions = [
  '1-3 months',
  '3-6 months',
  '6-12 months',
  '12+ months',
];

export function SystemAuditForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = useForm<SystemAuditFormData>({
    resolver: zodResolver(systemAuditSchema),
    defaultValues: {
      tech_stack: [],
      desired_outcomes: [],
    },
  });

  const watchTechStack = watch('tech_stack');
  const watchOutcomes = watch('desired_outcomes');

  const toggleArrayValue = (field: 'tech_stack' | 'desired_outcomes', value: string) => {
    const currentValues = field === 'tech_stack' ? watchTechStack : watchOutcomes;
    const newValues = currentValues?.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...(currentValues || []), value];
    setValue(field, newValues);
  };

  const validateStep = async () => {
    let fieldsToValidate: (keyof SystemAuditFormData)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ['name', 'email', 'company', 'role'];
        break;
      case 2:
        fieldsToValidate = ['current_challenge'];
        break;
      case 3:
        fieldsToValidate = ['team_size', 'tech_stack'];
        break;
      case 4:
        fieldsToValidate = ['desired_outcomes', 'budget_range', 'timeline'];
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    return isValid;
  };

  const nextStep = async () => {
    const isValid = await validateStep();
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: SystemAuditFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/system-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-boardroom/20 mb-6 animate-fade-in">
          <CheckCircle2 className="w-12 h-12 text-boardroom animate-commission" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-white mb-4 animate-fade-in-up">
          Audit Request Received
        </h2>
        <p className="text-cloud/70 max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Thank you for your interest in working with DevinAI. We will review your submission
          and reach out within 2 business days to schedule your system audit.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ProgressIndicator steps={steps} currentStep={currentStep} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: Contact Info */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-xs font-medium text-cloud uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                {...register('name')}
                type="text"
                className={cn(
                  'w-full px-4 py-3 bg-vault/10 border rounded-sm text-white placeholder-cloud/40',
                  'focus:outline-none focus:ring-2 focus:ring-boardroom focus:border-transparent',
                  'transition-all duration-200',
                  errors.name ? 'border-red-500' : 'border-cloud/20'
                )}
                placeholder="John Smith"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-cloud uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                className={cn(
                  'w-full px-4 py-3 bg-vault/10 border rounded-sm text-white placeholder-cloud/40',
                  'focus:outline-none focus:ring-2 focus:ring-boardroom focus:border-transparent',
                  'transition-all duration-200',
                  errors.email ? 'border-red-500' : 'border-cloud/20'
                )}
                placeholder="john@company.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-cloud uppercase tracking-wider mb-2">
                Company
              </label>
              <input
                {...register('company')}
                type="text"
                className={cn(
                  'w-full px-4 py-3 bg-vault/10 border rounded-sm text-white placeholder-cloud/40',
                  'focus:outline-none focus:ring-2 focus:ring-boardroom focus:border-transparent',
                  'transition-all duration-200',
                  errors.company ? 'border-red-500' : 'border-cloud/20'
                )}
                placeholder="Acme Corporation"
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-400">{errors.company.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-cloud uppercase tracking-wider mb-2">
                Your Role
              </label>
              <input
                {...register('role')}
                type="text"
                className={cn(
                  'w-full px-4 py-3 bg-vault/10 border rounded-sm text-white placeholder-cloud/40',
                  'focus:outline-none focus:ring-2 focus:ring-boardroom focus:border-transparent',
                  'transition-all duration-200',
                  errors.role ? 'border-red-500' : 'border-cloud/20'
                )}
                placeholder="VP of Engineering"
              />
              {errors.role && (
                <p className="mt-1 text-sm text-red-400">{errors.role.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Challenge */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-xs font-medium text-cloud uppercase tracking-wider mb-2">
                Current Challenge
              </label>
              <p className="text-cloud/60 text-sm mb-3">
                What is the primary technical or business challenge you are looking to solve?
              </p>
              <textarea
                {...register('current_challenge')}
                rows={6}
                className={cn(
                  'w-full px-4 py-3 bg-vault/10 border rounded-sm text-white placeholder-cloud/40',
                  'focus:outline-none focus:ring-2 focus:ring-boardroom focus:border-transparent',
                  'transition-all duration-200 resize-none',
                  errors.current_challenge ? 'border-red-500' : 'border-cloud/20'
                )}
                placeholder="Describe your current challenges, pain points, or goals..."
              />
              {errors.current_challenge && (
                <p className="mt-1 text-sm text-red-400">{errors.current_challenge.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Tech Stack */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-xs font-medium text-cloud uppercase tracking-wider mb-2">
                Team Size
              </label>
              <div className="grid grid-cols-5 gap-3">
                {teamSizeOptions.map((size) => (
                  <label
                    key={size}
                    className={cn(
                      'flex items-center justify-center px-4 py-3 border rounded-sm cursor-pointer',
                      'transition-all duration-200',
                      watch('team_size') === size
                        ? 'bg-boardroom/20 border-boardroom text-white shadow-glow-sm'
                        : 'bg-vault/10 border-cloud/20 text-cloud/60 hover:border-cloud/40'
                    )}
                  >
                    <input
                      type="radio"
                      {...register('team_size')}
                      value={size}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium">{size}</span>
                  </label>
                ))}
              </div>
              {errors.team_size && (
                <p className="mt-1 text-sm text-red-400">{errors.team_size.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-cloud uppercase tracking-wider mb-2">
                Current Tech Stack
              </label>
              <p className="text-cloud/60 text-sm mb-3">
                Select all technologies currently in use
              </p>
              <div className="grid grid-cols-4 gap-2">
                {techStackOptions.map((tech) => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => toggleArrayValue('tech_stack', tech)}
                    className={cn(
                      'px-3 py-2 border rounded-sm text-sm font-medium',
                      'transition-all duration-200',
                      watchTechStack?.includes(tech)
                        ? 'bg-boardroom/20 border-boardroom text-white shadow-glow-sm'
                        : 'bg-vault/10 border-cloud/20 text-cloud/60 hover:border-cloud/40'
                    )}
                  >
                    {watchTechStack?.includes(tech) && (
                      <Check className="w-3 h-3 inline mr-1" />
                    )}
                    {tech}
                  </button>
                ))}
              </div>
              {errors.tech_stack && (
                <p className="mt-1 text-sm text-red-400">{errors.tech_stack.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Desired Outcomes */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-xs font-medium text-cloud uppercase tracking-wider mb-2">
                Desired Outcomes
              </label>
              <p className="text-cloud/60 text-sm mb-3">
                What outcomes are most important to you?
              </p>
              <div className="grid grid-cols-2 gap-2">
                {outcomeOptions.map((outcome) => (
                  <button
                    key={outcome}
                    type="button"
                    onClick={() => toggleArrayValue('desired_outcomes', outcome)}
                    className={cn(
                      'px-4 py-3 border rounded-sm text-sm font-medium text-left',
                      'transition-all duration-200',
                      watchOutcomes?.includes(outcome)
                        ? 'bg-boardroom/20 border-boardroom text-white shadow-glow-sm'
                        : 'bg-vault/10 border-cloud/20 text-cloud/60 hover:border-cloud/40'
                    )}
                  >
                    {watchOutcomes?.includes(outcome) && (
                      <Check className="w-4 h-4 inline mr-2" />
                    )}
                    {outcome}
                  </button>
                ))}
              </div>
              {errors.desired_outcomes && (
                <p className="mt-1 text-sm text-red-400">{errors.desired_outcomes.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-cloud uppercase tracking-wider mb-2">
                Budget Range
              </label>
              <div className="grid grid-cols-5 gap-2">
                {budgetOptions.map((budget) => (
                  <label
                    key={budget}
                    className={cn(
                      'flex items-center justify-center px-3 py-3 border rounded-sm cursor-pointer',
                      'transition-all duration-200 text-center',
                      watch('budget_range') === budget
                        ? 'bg-boardroom/20 border-boardroom text-white shadow-glow-sm'
                        : 'bg-vault/10 border-cloud/20 text-cloud/60 hover:border-cloud/40'
                    )}
                  >
                    <input
                      type="radio"
                      {...register('budget_range')}
                      value={budget}
                      className="sr-only"
                    />
                    <span className="text-xs font-medium">{budget}</span>
                  </label>
                ))}
              </div>
              {errors.budget_range && (
                <p className="mt-1 text-sm text-red-400">{errors.budget_range.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-cloud uppercase tracking-wider mb-2">
                Timeline
              </label>
              <div className="grid grid-cols-4 gap-2">
                {timelineOptions.map((timeline) => (
                  <label
                    key={timeline}
                    className={cn(
                      'flex items-center justify-center px-3 py-3 border rounded-sm cursor-pointer',
                      'transition-all duration-200 text-center',
                      watch('timeline') === timeline
                        ? 'bg-boardroom/20 border-boardroom text-white shadow-glow-sm'
                        : 'bg-vault/10 border-cloud/20 text-cloud/60 hover:border-cloud/40'
                    )}
                  >
                    <input
                      type="radio"
                      {...register('timeline')}
                      value={timeline}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium">{timeline}</span>
                  </label>
                ))}
              </div>
              {errors.timeline && (
                <p className="mt-1 text-sm text-red-400">{errors.timeline.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t border-cloud/10">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center px-6 py-3 text-cloud/70 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center px-6 py-3 bg-boardroom hover:bg-boardroom/90 text-white rounded-sm font-medium transition-all duration-200 hover:shadow-glow"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-8 py-3 bg-boardroom hover:bg-boardroom/90 text-white rounded-sm font-medium transition-all duration-200 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Request Audit
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
