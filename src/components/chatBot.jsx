"use client";
import React, { useEffect } from 'react';

const VoiceflowWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.onload = () => {
      window.voiceflow.chat.load({
        verify: { projectID: '667b22dcf1c1478597dccfa5' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production'
      });
    };
    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    script.type = "text/javascript";
    document.getElementsByTagName('head')[0].appendChild(script);

    return () => {
      // Cleanup: remove the script when component unmounts
      document.getElementsByTagName('head')[0].removeChild(script);
    };
  }, []);

  return null; // Or render a placeholder if needed
};

export default VoiceflowWidget;
