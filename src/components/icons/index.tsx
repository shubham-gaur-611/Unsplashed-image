import React from 'react';
import { Heart, ImageIcon, Search } from 'lucide-react';

export const Icons = {
  Heart: (props: React.ComponentProps<typeof Heart>) => <Heart {...props} />,
  Image: (props: React.ComponentProps<typeof ImageIcon>) => <ImageIcon {...props} />,
  Search: (props: React.ComponentProps<typeof Search>) => <Search {...props} />,
};