import { useState } from 'react';
import { AlertCircle, CheckCircle, Bell } from 'lucide-react';

const Settings = () => {
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    theme: 'dark',
    language: 'en',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
    setSaved(false);
    setError(null);
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
    setSaved(false);
    setError(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app, we would send these settings to the backend
      console.log('Saving settings:', settings);
      setSaved(true);
      setError(null);
      
      // Reset the saved message after 3 seconds
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (err) {
      setError('Failed to save settings');
      setSaved(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto ">
      <h1 className="text-2xl font-semibold text-white mb-6">Settings</h1>
      
      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {saved && (
        <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">Settings saved successfully</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="shadow overflow-hidden space-y-6 dark:bg-white/5 rounded-lg p-6 text-white dark:text-white border dark:border-[#4e4f57]">
        <div className="p-6 sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-white">Notifications</h3>
              <p className="mt-1 text-sm text-gray-500">
                Configure how you receive notifications.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="emailNotifications"
                        name="emailNotifications"
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={handleChange}
                        className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="emailNotifications" className="font-medium text-white">
                        Email notifications
                      </label>
                      <p className="text-gray-500">Receive notifications via email.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="smsNotifications"
                        name="smsNotifications"
                        type="checkbox"
                        checked={settings.smsNotifications}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="smsNotifications" className="font-medium text-white">
                        SMS notifications
                      </label>
                      <p className="text-gray-500">Receive notifications via SMS.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="marketingEmails"
                        name="marketingEmails"
                        type="checkbox"
                        checked={settings.marketingEmails}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="marketingEmails" className="font-medium text-white">
                        Marketing emails
                      </label>
                      <p className="text-gray-500">Receive marketing emails about new features and updates.</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-500 p-6 sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-white">Appearance</h3>
              <p className="mt-1 text-sm text-gray-500">
                Customize the appearance of the dashboard.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="theme" className="form-label">
                      Theme
                    </label>
                    <select
                      id="theme"
                      name="theme"
                      className="form-input bg-white/20"
                      value={settings.theme}
                      onChange={handleSelectChange}
                    >
                      <option className='text-black' value="light">Light</option>
                      <option className='text-black' value="dark">Dark</option>
                      <option className='text-black' value="system">System Default</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="language" className="form-label">
                      Language
                    </label>
                    <select
                      id="language"
                      name="language"
                      className="form-input bg-white/20"
                      value={settings.language}
                      onChange={handleSelectChange}
                    >
                      <option className='text-black' value="en">English</option>
                      <option className='text-black' value="es">Spanish</option>
                      <option className='text-black' value="fr">French</option>
                      <option className='text-black' value="de">German</option>
                    </select>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="btn-primary bg-violet-500 hover:bg-violet-800"
                    >
                      Save Settings
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;