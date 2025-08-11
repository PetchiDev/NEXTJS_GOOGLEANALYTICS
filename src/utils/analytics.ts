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
    window.gtag('event', 'newsletter_subscription', {
      success,
      source,
    });
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
    window.gtag('event', 'banner_interaction', {
      banner_id: bannerId,
      action,
      banner_type: bannerType,
    });
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
