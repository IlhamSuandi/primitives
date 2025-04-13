import * as React from 'react';
import { Primitive } from '@radix-ui/react-primitive';

type RegionType = 'polite' | 'assertive' | 'off';
type RegionRole = 'status' | 'alert' | 'log' | 'none';
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface AnnounceProps extends PrimitiveDivProps {
    /**
     * Mirrors the `aria-atomic` DOM attribute for live regions. It is an optional attribute that
     * indicates whether assistive technologies will present all, or only parts of, the changed region
     * based on the change notifications defined by the `aria-relevant` attribute.
     *
     * @see WAI-ARIA https://www.w3.org/TR/wai-aria-1.2/#aria-atomic
     * @see Demo     http://pauljadam.com/demos/aria-atomic-relevant.html
     */
    'aria-atomic'?: boolean;
    /**
     * Mirrors the `aria-relevant` DOM attribute for live regions. It is an optional attribute used to
     * describe what types of changes have occurred to the region, and which changes are relevant and
     * should be announced. Any change that is not relevant acts in the same manner it would if the
     * `aria-live` attribute were set to off.
     *
     * Unfortunately, `aria-relevant` doesn't behave as expected across all device/screen reader
     * combinations. It's important to test its implementation before relying on it to work for your
     * users. The attribute is omitted by default.
     *
     * @see WAI-ARIA https://www.w3.org/TR/wai-aria-1.2/#aria-relevant
     * @see MDN      https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-relevant_attribute
     * @see Opinion  https://medium.com/dev-channel/why-authors-should-avoid-aria-relevant-5d3164fab1e3
     * @see Demo     http://pauljadam.com/demos/aria-atomic-relevant.html
     */
    'aria-relevant'?: PrimitiveDivProps['aria-relevant'];
    /**
     * React children of your component. Children can be mirrored directly or modified to optimize for
     * screen reader user experience.
     */
    children: React.ReactNode;
    /**
     * An optional unique identifier for the live region.
     *
     * By default, `Announce` components create, at most, two unique `aria-live` regions in the
     * document (one for all `polite` notifications, one for all `assertive` notifications). In some
     * cases you may wish to append additional `aria-live` regions for distinct purposes (for example,
     * simple status updates may need to be separated from a stack of toast-style notifications). By
     * passing an id, you indicate that any content rendered by components with the same identifier
     * should be mirrored in a separate `aria-live` region.
     */
    regionIdentifier?: string;
    /**
     * Mirrors the `role` DOM attribute. This is optional and may be useful as an override in some
     * cases. By default, the role is determined by the `type` prop.
     *
     * @see MDN https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions#Preferring_specialized_live_region_roles
     */
    role?: RegionRole;
    /**
     * Mirrors the `aria-live` DOM attribute. The `aria-live=POLITENESS_SETTING` is used to set the
     * priority with which screen reader should treat updates to live regions. Its possible settings
     * are: off, polite or assertive. Defaults to `polite`.
     *
     * @see MDN https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
     */
    type?: RegionType;
}
declare const Announce: React.ForwardRefExoticComponent<AnnounceProps & React.RefAttributes<HTMLDivElement>>;
declare const Root: React.ForwardRefExoticComponent<AnnounceProps & React.RefAttributes<HTMLDivElement>>;

export { Announce, type AnnounceProps, Root };
