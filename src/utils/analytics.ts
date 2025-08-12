// Google Analytics 4 tracking utility
declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'set',
      action: string,
      parameters?: Record<string, any>
    ) => void;
  }
}

// Track page views
export const trackPageView = (page_title: string, page_location?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title,
      page_location: page_location || window.location.href,
    });
  }
};

// Track article/post impressions
export const trackArticleImpression = (articleId: string, articleTitle: string, category: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      item_id: articleId,
      item_name: articleTitle,
      item_category: category,
      content_type: 'article',
    });
  }
};

// Track article/post clicks
export const trackArticleClick = (articleId: string, articleTitle: string, category: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'select_item', {
      item_id: articleId,
      item_name: articleTitle,
      item_category: category,
      content_type: 'article',
    });
  }
};

// Track video plays
export const trackVideoPlay = (videoId: string, videoTitle: string, category: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'video_start', {
      video_id: videoId,
      video_title: videoTitle,
      video_category: category,
    });
  }
};

// Track share actions
export const trackShareAction = (platform: string, articleId: string, articleTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'share', {
      method: platform,
      content_type: 'article',
      item_id: articleId,
      item_name: articleTitle,
    });
  }
};

// Track like/unlike actions
export const trackLikeAction = (articleId: string, articleTitle: string, isLiked: boolean) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'like', {
      item_id: articleId,
      item_name: articleTitle,
      value: isLiked ? 1 : 0,
    });
  }
};

// Track comment actions
export const trackCommentAction = (action: 'submit' | 'edit' | 'delete', articleId: string, articleTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'comment', {
      action,
      item_id: articleId,
      item_name: articleTitle,
    });
  }
};

// Track report actions
export const trackReportAction = (articleId: string, articleTitle: string, reason: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'report', {
      item_id: articleId,
      item_name: articleTitle,
      reason,
    });
  }
};

// Track newsletter subscription
export const trackNewsletterSubscription = (success: boolean, source: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    console.log('📊 Sending to Google Analytics:', { success, source });
    window.gtag('event', 'newsletter_subscription', {
      success,
      source,
    });
    console.log('✅ Google Analytics event sent');
  } else {
    console.warn('⚠️ Google Analytics not available (gtag not found)');
  }
};

// Track category filter usage
export const trackCategoryFilter = (category: string, source: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'filter_applied', {
      filter_type: 'category',
      filter_value: category,
      source,
    });
  }
};

// Track mobile accordion toggles
export const trackAccordionToggle = (section: string, isOpen: boolean) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'accordion_toggle', {
      section,
      action: isOpen ? 'open' : 'close',
    });
  }
};

// Track banner interactions
export const trackBannerInteraction = (bannerId: string, action: 'view' | 'click', bannerType: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action === 'view' ? 'banner_impression' : 'banner_click', {
      banner_id: bannerId,
      banner_type: bannerType,
      content_type: 'banner',
      vertical: 'content',
      analytics_type: 'banner_tracking'
    });
  }
};

// Track banner analytics to QL server
export const trackBannerAnalytics = async (
  bannerId: string, 
  action: 'view' | 'click', 
  bannerType: string,
  duration?: string,
  url?: string
) => {
  try {
    // Only send the exact payload structure you specified
    const analyticsData = {
      banner: bannerId,
      impressions: [],
      url: url || window.location.pathname
    };

    // Send to QL analytics server with type=7 and vertical=12 as query params
    const queryParams = new URLSearchParams({
      type: '7',        // VIEW_BANNER_IMPRESSION
      vertical: '12'    // CONTENT
    });

    const response = await fetch(`https://ql-shared-prod.qatarliving.com/analytics?${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(analyticsData)
    });

    if (!response.ok) {
      console.warn('Banner analytics failed:', response.status);
    }
  } catch (error) {
    console.error('Error tracking banner analytics:', error);
  }
};

// Track "More Posts" section interactions
export const trackMorePostsInteraction = (action: 'view' | 'click', section: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'more_posts_interaction', {
      action,
      section,
    });
  }
};

// Track search interactions
export const trackSearchInteraction = (query: string, resultsCount: number, source: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: query,
      results_count: resultsCount,
      source,
    });
  }
};

// Track pagination
export const trackPagination = (pageNumber: number, source: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'pagination', {
      page_number: pageNumber,
      source,
    });
  }
};

// ===== QL ANALYTICS SERVER TRACKING =====

// Track article/post impressions to QL server
export const trackArticleImpressionQL = async (
  articleId: string, 
  articleTitle: string, 
  category: string,
  url?: string
) => {
  try {
    const analyticsData = {
      article_id: articleId,
      article_title: articleTitle,
      category: category,
      action: 'article_impression',
      url: url || window.location.pathname,
      timestamp: new Date().toISOString()
    };

    const queryParams = new URLSearchParams({
      type: '9',        // ACTION_TRACKING
      vertical: '12'    // CONTENT
    });

    const response = await fetch(`https://ql-shared-prod.qatarliving.com/analytics?${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(analyticsData)
    });

    if (!response.ok) {
      console.warn('Article impression analytics failed:', response.status);
    }
  } catch (error) {
    console.error('Error tracking article impression:', error);
  }
};

// Track article/post clicks to QL server
export const trackArticleClickQL = async (
  articleId: string, 
  articleTitle: string, 
  category: string,
  url?: string
) => {
  try {
    const analyticsData = {
      article_id: articleId,
      article_title: articleTitle,
      category: category,
      action: 'article_click',
      url: url || window.location.pathname,
      timestamp: new Date().toISOString()
    };

    const queryParams = new URLSearchParams({
      type: '9',        // ACTION_TRACKING
      vertical: '12'    // CONTENT
    });

    const response = await fetch(`https://ql-shared-prod.qatarliving.com/analytics?${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(analyticsData)
    });

    if (!response.ok) {
      console.warn('Article click analytics failed:', response.status);
    }
  } catch (error) {
    console.error('Error tracking article click:', error);
  }
};

// Track video plays to QL server
export const trackVideoPlayQL = async (
  videoId: string, 
  videoTitle: string, 
  category: string,
  url?: string
) => {
  try {
    const analyticsData = {
      video_id: videoId,
      video_title: videoTitle,
      category: category,
      action: 'video_play',
      url: url || window.location.pathname,
      timestamp: new Date().toISOString()
    };

    const queryParams = new URLSearchParams({
      type: '9',        // ACTION_TRACKING
      vertical: '12'    // CONTENT
    });

    const response = await fetch(`https://ql-shared-prod.qatarliving.com/analytics?${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(analyticsData)
    });

    if (!response.ok) {
      console.warn('Video play analytics failed:', response.status);
    }
  } catch (error) {
    console.error('Error tracking video play:', error);
  }
};

// Track share actions to QL server
export const trackShareActionQL = async (
  platform: string, 
  articleId: string, 
  articleTitle: string,
  url?: string
) => {
  try {
    const analyticsData = {
      platform: platform,
      article_id: articleId,
      article_title: articleTitle,
      action: 'share_action',
      url: url || window.location.pathname,
      timestamp: new Date().toISOString()
    };

    const queryParams = new URLSearchParams({
      type: '9',        // ACTION_TRACKING
      vertical: '12'    // CONTENT
    });

    const response = await fetch(`https://ql-shared-prod.qatarliving.com/analytics?${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(analyticsData)
    });

    if (!response.ok) {
      console.warn('Share action analytics failed:', response.status);
    }
  } catch (error) {
    console.error('Error tracking share action:', error);
  }
};

// Track like/unlike actions to QL server
export const trackLikeActionQL = async (
  articleId: string, 
  articleTitle: string, 
  isLiked: boolean,
  url?: string
) => {
  try {
    const analyticsData = {
      article_id: articleId,
      article_title: articleTitle,
      action: isLiked ? 'like' : 'unlike',
      url: url || window.location.pathname,
      timestamp: new Date().toISOString()
    };

    const queryParams = new URLSearchParams({
      type: '9',        // ACTION_TRACKING
      vertical: '12'    // CONTENT
    });

    const response = await fetch(`https://ql-shared-prod.qatarliving.com/analytics?${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(analyticsData)
    });

    if (!response.ok) {
      console.warn('Like action analytics failed:', response.status);
    }
  } catch (error) {
    console.error('Error tracking like action:', error);
  }
};

// Track comment actions to QL server
export const trackCommentActionQL = async (
  action: 'submit' | 'edit' | 'delete', 
  articleId: string, 
  articleTitle: string,
  url?: string
) => {
  try {
    const analyticsData = {
      comment_action: action,
      article_id: articleId,
      article_title: articleTitle,
      action: 'comment_action',
      url: url || window.location.pathname,
      timestamp: new Date().toISOString()
    };

    const queryParams = new URLSearchParams({
      type: '9',        // ACTION_TRACKING
      vertical: '12'    // CONTENT
    });

    const response = await fetch(`https://ql-shared-prod.qatarliving.com/analytics?${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(analyticsData)
    });

    if (!response.ok) {
      console.warn('Comment action analytics failed:', response.status);
    }
  } catch (error) {
    console.error('Error tracking comment action:', error);
  }
};

// Track report actions to QL server
export const trackReportActionQL = async (
  articleId: string, 
  articleTitle: string, 
  reason: string,
  url?: string
) => {
  try {
    const analyticsData = {
      article_id: articleId,
      article_title: articleTitle,
      report_reason: reason,
      action: 'report_action',
      url: url || window.location.pathname,
      timestamp: new Date().toISOString()
    };

    const queryParams = new URLSearchParams({
      type: '9',        // ACTION_TRACKING
      vertical: '12'    // CONTENT
    });

    const response = await fetch(`https://ql-shared-prod.qatarliving.com/analytics?${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(analyticsData)
    });

    if (!response.ok) {
      console.warn('Report action analytics failed:', response.status);
    }
  } catch (error) {
    console.error('Error tracking report action:', error);
  }
};

// Track newsletter subscription to QL server
export const trackNewsletterSubscriptionQL = async (
  success: boolean, 
  source: string,
  url?: string
) => {
  try {
    const analyticsData = {
      success: success,
      source: source,
      action: 'newsletter_subscription',
      url: url || window.location.pathname,
      timestamp: new Date().toISOString()
    };

    const queryParams = new URLSearchParams({
      type: '9',        // ACTION_TRACKING
      vertical: '12'    // CONTENT
    });

    const analyticsUrl = `https://ql-shared-prod.qatarliving.com/analytics?${queryParams}`;
    
    console.log('🌐 Sending analytics to QL Server:', {
      url: analyticsUrl,
      payload: analyticsData
    });

    const response = await fetch(analyticsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(analyticsData)
    });

    if (!response.ok) {
      console.warn('❌ Newsletter subscription analytics failed:', response.status);
    } else {
      console.log('✅ Newsletter subscription analytics sent successfully:', response.status);
    }
  } catch (error) {
    console.error('❌ Error tracking newsletter subscription:', error);
  }
};

// Track category filter usage to QL server
export const trackCategoryFilterQL = async (
  category: string, 
  source: string,
  url?: string
) => {
  try {
    const analyticsData = {
      category: category,
      source: source,
      action: 'category_filter',
      url: url || window.location.pathname,
      timestamp: new Date().toISOString()
    };

    const queryParams = new URLSearchParams({
      type: '9',        // ACTION_TRACKING
      vertical: '12'    // CONTENT
    });

    const response = await fetch(`https://ql-shared-prod.qatarliving.com/analytics?${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(analyticsData)
    });

    if (!response.ok) {
      console.warn('Category filter analytics failed:', response.status);
    }
  } catch (error) {
    console.error('Error tracking category filter:', error);
  }
};

// Track mobile accordion toggles to QL server
export const trackAccordionToggleQL = async (
  section: string, 
  isOpen: boolean,
  url?: string
) => {
  try {
    const analyticsData = {
      section: section,
      action: isOpen ? 'accordion_open' : 'accordion_close',
      url: url || window.location.pathname,
      timestamp: new Date().toISOString()
    };

    const queryParams = new URLSearchParams({
      type: '9',        // ACTION_TRACKING
      vertical: '12'    // CONTENT
    });

    const response = await fetch(`https://ql-shared-prod.qatarliving.com/analytics?${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(analyticsData)
    });

    if (!response.ok) {
      console.warn('Accordion toggle analytics failed:', response.status);
    }
  } catch (error) {
    console.error('Error tracking accordion toggle:', error);
  }
};

// Track "More Posts" section interactions to QL server
export const trackMorePostsInteractionQL = async (
  action: 'view' | 'click', 
  section: string,
  url?: string
) => {
  try {
    const analyticsData = {
      more_posts_action: action,
      section: section,
      action: 'more_posts_interaction',
      url: url || window.location.pathname,
      timestamp: new Date().toISOString()
    };

    const queryParams = new URLSearchParams({
      type: '9',        // ACTION_TRACKING
      vertical: '12'    // CONTENT
    });

    const response = await fetch(`https://ql-shared-prod.qatarliving.com/analytics?${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(analyticsData)
    });

    if (!response.ok) {
      console.warn('More posts interaction analytics failed:', response.status);
    }
  } catch (error) {
    console.error('Error tracking more posts interaction:', error);
  }
};

// Track search interactions to QL server
export const trackSearchInteractionQL = async (
  query: string, 
  resultsCount: number, 
  source: string,
  url?: string
) => {
  try {
    const analyticsData = {
      search_query: query,
      results_count: resultsCount,
      source: source,
      action: 'search_interaction',
      url: url || window.location.pathname,
      timestamp: new Date().toISOString()
    };

    const queryParams = new URLSearchParams({
      type: '9',        // ACTION_TRACKING
      vertical: '12'    // CONTENT
    });

    const response = await fetch(`https://ql-shared-prod.qatarliving.com/analytics?${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(analyticsData)
    });

    if (!response.ok) {
      console.warn('Search interaction analytics failed:', response.status);
    }
  } catch (error) {
    console.error('Error tracking search interaction:', error);
  }
};

// Track pagination to QL server
export const trackPaginationQL = async (
  pageNumber: number, 
  source: string,
  url?: string
) => {
  try {
    const analyticsData = {
      page_number: pageNumber,
      source: source,
      action: 'pagination',
      url: url || window.location.pathname,
      timestamp: new Date().toISOString()
    };

    const queryParams = new URLSearchParams({
      type: '9',        // ACTION_TRACKING
      vertical: '12'    // CONTENT
    });

    const response = await fetch(`https://ql-shared-prod.qatarliving.com/analytics?${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(analyticsData)
    });

    if (!response.ok) {
      console.warn('Pagination analytics failed:', response.status);
    }
  } catch (error) {
    console.error('Error tracking pagination:', error);
  }
};
