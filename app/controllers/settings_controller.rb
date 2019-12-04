class SettingsController < ApplicationController

  def index
    @settings = [
      { label: 'App Design', icon_url: 'https://arcadia-static-assets.s3.amazonaws.com/arcadia-svgs/SettingsNextButton.svg' },
      { label: 'Change Language', icon_url: 'https://arcadia-static-assets.s3.amazonaws.com/arcadia-svgs/SettingsNextButton.svg'  },
      { label: 'Enable FitBit', icon_url: 'https://arcadia-static-assets.s3.amazonaws.com/arcadia-svgs/SettingsNextButton.svg'  },
      { label: 'Notifications', icon_url: 'https://arcadia-static-assets.s3.amazonaws.com/arcadia-svgs/SettingsNextButton.svg'  },
      { label: 'Metric System', icon_url: 'https://arcadia-static-assets.s3.amazonaws.com/arcadia-svgs/SettingsNextButton.svg'  },
      { label: 'Health Insights', icon_url: 'https://arcadia-static-assets.s3.amazonaws.com/arcadia-svgs/SettingsNextButton.svg'  },
  ]
  end

end
