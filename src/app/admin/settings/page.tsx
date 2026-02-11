'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase, isDemoMode } from '@/lib/supabase';
import {
  User,
  Mail,
  Key,
  Bell,
  Globe,
  Palette,
  Save,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const { user, profile, isDemo } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'site'>('profile');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profileData, setProfileData] = useState({
    full_name: profile?.full_name || '',
    email: user?.email || '',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email_new_leads: true,
    email_new_contacts: true,
    email_newsletter_signups: false,
  });

  const [siteSettings, setSiteSettings] = useState({
    site_title: 'DevinAI',
    site_description: 'Outcome Architecture for Predictable Software Growth',
    contact_email: 'hello@devinai.com',
  });

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    if (isDemoMode()) {
      // Simulate save in demo mode
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      return;
    }

    try {
      if (activeTab === 'profile' && user) {
        const { error } = await supabase
          .from('profiles')
          .update({
            full_name: profileData.full_name,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);

        if (error) throw error;
      }

      // For notifications and site settings, you would save to a settings table
      // For now, we just simulate success

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'site' as const, label: 'Site Settings', icon: Globe },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account and site preferences</p>
      </div>

      {isDemo && (
        <div className="bg-terracotta/10 border border-terracotta/30 rounded-lg p-4">
          <p className="text-gray-900 text-sm">
            <strong>Demo Mode:</strong> Settings changes will not persist. Connect
            Supabase for full functionality.
          </p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-56 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-terracotta/10 text-terracotta'
                    : 'text-gray-600 hover:bg-sand hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white border border-sand rounded-xl p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Profile Information
                  </h2>
                  <p className="text-sm text-gray-600">
                    Update your account details and preferences.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={profileData.full_name}
                        onChange={(e) =>
                          setProfileData((prev) => ({ ...prev, full_name: e.target.value }))
                        }
                        className="w-full pl-10 pr-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta text-gray-900"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={profileData.email}
                        disabled
                        className="w-full pl-10 pr-4 py-3 border border-sand rounded-lg bg-cream text-gray-500 cursor-not-allowed"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Email cannot be changed. Contact support if needed.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-sand">
                    <button
                      disabled
                      className="flex items-center gap-2 text-sm text-gray-500 cursor-not-allowed"
                    >
                      <Key className="w-4 h-4" />
                      Change Password
                    </button>
                    <p className="mt-1 text-xs text-gray-500">
                      Use the password reset flow from the login page.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Email Notifications
                  </h2>
                  <p className="text-sm text-gray-600">
                    Choose what email notifications you receive.
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 border border-sand rounded-lg cursor-pointer hover:bg-cream transition-colors">
                    <div>
                      <p className="font-medium text-gray-900">New Lead Notifications</p>
                      <p className="text-sm text-gray-600">
                        Get notified when someone submits a System Audit request.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.email_new_leads}
                      onChange={(e) =>
                        setNotificationSettings((prev) => ({
                          ...prev,
                          email_new_leads: e.target.checked,
                        }))
                      }
                      className="w-5 h-5 text-terracotta border-sand rounded focus:ring-terracotta"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 border border-sand rounded-lg cursor-pointer hover:bg-cream transition-colors">
                    <div>
                      <p className="font-medium text-gray-900">Contact Form Submissions</p>
                      <p className="text-sm text-gray-600">
                        Get notified when someone submits the contact form.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.email_new_contacts}
                      onChange={(e) =>
                        setNotificationSettings((prev) => ({
                          ...prev,
                          email_new_contacts: e.target.checked,
                        }))
                      }
                      className="w-5 h-5 text-terracotta border-sand rounded focus:ring-terracotta"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 border border-sand rounded-lg cursor-pointer hover:bg-cream transition-colors">
                    <div>
                      <p className="font-medium text-gray-900">Newsletter Signups</p>
                      <p className="text-sm text-gray-600">
                        Get notified when someone subscribes to your newsletter.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.email_newsletter_signups}
                      onChange={(e) =>
                        setNotificationSettings((prev) => ({
                          ...prev,
                          email_newsletter_signups: e.target.checked,
                        }))
                      }
                      className="w-5 h-5 text-terracotta border-sand rounded focus:ring-terracotta"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Site Settings Tab */}
            {activeTab === 'site' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Site Settings
                  </h2>
                  <p className="text-sm text-gray-600">
                    Configure your site metadata and contact information.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Title
                    </label>
                    <div className="relative">
                      <Palette className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={siteSettings.site_title}
                        onChange={(e) =>
                          setSiteSettings((prev) => ({ ...prev, site_title: e.target.value }))
                        }
                        className="w-full pl-10 pr-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta text-gray-900"
                        placeholder="Your site title"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Description
                    </label>
                    <textarea
                      value={siteSettings.site_description}
                      onChange={(e) =>
                        setSiteSettings((prev) => ({
                          ...prev,
                          site_description: e.target.value,
                        }))
                      }
                      rows={3}
                      className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta text-gray-900 resize-none"
                      placeholder="Brief description of your site"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={siteSettings.contact_email}
                        onChange={(e) =>
                          setSiteSettings((prev) => ({
                            ...prev,
                            contact_email: e.target.value,
                          }))
                        }
                        className="w-full pl-10 pr-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta text-gray-900"
                        placeholder="contact@example.com"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      This email is displayed on your contact page.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-6 pt-6 border-t border-sand flex items-center justify-end gap-4">
              {saved && (
                <span className="flex items-center gap-2 text-green-600 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  Settings saved
                </span>
              )}
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
