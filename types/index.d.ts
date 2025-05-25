// Type definitions for Tagify
// This file bundles the type definitions from @types/yaireo__tagify into the project
// to eliminate the need for users to install @types/yaireo__tagify separately

import * as React from 'react';

declare namespace Tagify {
    // Mode for how tags are displayed and how they can be edited
    type TagifyMode = "select" | "mix";

    // Where the dropdown menu will appear
    type DropDownPosition = "manual" | "text" | "input" | "all";

    // Settings for the autocomplete feature at runtime
    interface AutoCompleteRuntimeSettings {
        enabled: boolean;
        rightKey: boolean;
        tabKey: boolean;
    }

    // Settings for the autocomplete feature configuration
    interface AutoCompleteSettings extends Partial<AutoCompleteRuntimeSettings> {}

    // Settings for the dropdown feature at runtime
    interface DropDownRuntimeSettings<T extends BaseTagData = TagData> {
        enabled: number | false;
        caseSensitive: boolean;
        maxItems: number;
        classname: string;
        fuzzySearch: boolean;
        sortby: "startsWith" | ((items: T[], query: string) => T[]);
        accentedSearch: boolean;
        includeSelectedTags: boolean;
        escapeHTML: boolean;
        position: DropDownPosition;
        RTL: boolean;
        highlightFirst: boolean;
        closeOnSelect: boolean;
        clearOnSelect: boolean;
        mapValueTo?: string | ((data: T) => string) | undefined;
        searchKeys: string[];
        appendTarget: HTMLElement | (() => HTMLElement) | null;
        placeAbove?: boolean | undefined;
    }

    // Settings for the dropdown feature configuration
    interface DropDownSettings<T extends BaseTagData = TagData> extends Partial<DropDownRuntimeSettings<T>> {}

    // Options for the mix mode feature at runtime
    interface MixModeRuntimeSettings {
        insertAfterTag: string | HTMLElement;
    }

    // Options for the mix mode feature configuration
    interface MixModeSettings extends Partial<MixModeRuntimeSettings> {}

    // Options related to accessibility at runtime
    interface A11yRuntimeSettings {
        focusableTags: boolean;
    }

    // Options related to accessibility configuration
    interface A11ySettings extends Partial<A11yRuntimeSettings> {}

    // Options for the edit tags feature at runtime
    interface EditTagsRuntimeSettings {
        clicks: 1 | 2;
        keepInvalid: boolean;
    }

    // Options for the edit tags feature configuration
    interface EditTagsSettings extends Partial<EditTagsRuntimeSettings> {}

    // Messages for reasons if tag validation fails
    interface InvalidTagsMessages {
        empty: string;
        exceed: string;
        pattern: string;
        duplicate: string;
        notAllowed: string;
    }

    // Class names at runtime
    interface ClassNameRuntimeSettings {
        namespace: string;
        mixMode: string;
        selectMode: string;
        input: string;
        focus: string;
        tag: string;
        tagNoAnimation: string;
        tagInvalid: string;
        tagNotAllowed: string;
        inputInvalid: string;
        tagX: string;
        tagText: string;
        dropdown: string;
        dropdownWrapper: string;
        dropdownHeader: string;
        dropdownFooter: string;
        dropdownItem: string;
        dropdownItemActive: string;
        dropdownItemHidden: string;
        dropdownInital: string;
        dropdownItemSelected: string;
        scopeLoading: string;
        tagLoading: string;
        tagEditing: string;
        tagFlash: string;
        tagHide: string;
        hasMaxTags: string;
        hasNoTags: string;
        empty: string;
    }

    // Optional class names configuration
    interface ClassNameSettings extends Partial<ClassNameRuntimeSettings> {}

    // Template rendering functions at runtime
    interface TemplatesRuntime<T extends BaseTagData = TagData> {
        wrapper: (
            this: Tagify<T>,
            input: HTMLInputElement | HTMLTextAreaElement,
            settings: TagifyRuntimeSettings<T>,
        ) => string;
        tag: (this: Tagify<T>, tagData: T, tagify: Tagify<T>) => string;
        dropdown: (this: Tagify<T>, settings: TagifyRuntimeSettings<T>) => string;
        dropdownContent: (this: Tagify<T>, htmlContent: string) => string;
        dropdownItem: (this: Tagify<T>, item: T) => string;
        dropdownHeader: (this: Tagify<T>, suggestions: T[]) => string;
        dropdownFooter: (this: Tagify<T>, suggestions: T[]) => string;
        dropdownItemNoMatch: ((this: Tagify<T>, data: { value: string }) => string) | null;
    }

    // Template rendering functions configuration
    interface Templates<T extends BaseTagData = TagData> extends Partial<TemplatesRuntime<T>> {}

    // Data for suggestion click events
    interface SuggestionClickData<T extends BaseTagData = TagData> {
        tagify: Tagify<T>;
        tagData: T | null;
        suggestionElm: HTMLElement | null;
    }

    // Data for paste events
    interface BeforePasteData<T extends BaseTagData = TagData> {
        tagify: Tagify<T>;
        pastedText: string;
        clipboardData: DataTransfer;
    }

    // Data for keydown events
    interface BeforeKeyDownData<T extends BaseTagData = TagData> {
        tagify: Tagify<T>;
    }

    // Runtime hooks
    interface HooksRuntime<T extends BaseTagData = TagData> {
        beforeRemoveTag: (tags: T[]) => Promise<void>;
        suggestionClick: (event: MouseEvent | KeyboardEvent, data: SuggestionClickData<T>) => Promise<void>;
        beforePaste: (event: ClipboardEvent, data: BeforePasteData<T>) => Promise<string | undefined>;
        beforeKeyDown: (event: KeyboardEvent, data: BeforeKeyDownData<T>) => Promise<void>;
    }

    // Hooks configuration
    interface Hooks<T extends BaseTagData = TagData> extends Partial<HooksRuntime<T>> {}

    // Core tagify settings
    interface TagifyCoreSettings<T extends BaseTagData = TagData> {
        readonly: boolean;
        tagTextProp: keyof T;
        placeholder: string;
        delimiters: string | RegExp;
        pattern: string | RegExp | null;
        mode?: TagifyMode | null | undefined;
        mixTagsInterpolator: [string, string];
        mixTagsAllowedAfter: RegExp;
        duplicates: boolean;
        trim: boolean;
        id?: string | undefined;
        enforceWhitelist: boolean;
        userInput: boolean;
        focusable: boolean;
        whitelist: string[] | T[];
        blacklist: string[];
        addTagOnBlur: boolean;
        addTagOn: string[];
        onChangeAfterBlur: boolean;
        pasteAsTags: boolean;
        callbacks?: {
            [K in keyof EventDataMap]?: (event: CustomEvent<EventDataMap<T>[K]>) => void;
        } | undefined;
        maxTags: number;
        texts?: Partial<InvalidTagsMessages> | undefined;
        validate?: ((tagData: T) => boolean | string) | undefined;
        transformTag: (tagData: T) => void;
        keepInvalidTags: boolean;
        createInvalidTags: boolean;
        skipInvalid: boolean;
        backspace: boolean | "edit";
        originalInputValueFormat?: ((value: T[]) => string) | undefined;
    }

    // Runtime settings
    interface TagifyRuntimeSettings<T extends BaseTagData = TagData> extends TagifyCoreSettings<T> {
        required: boolean;
        disabled: boolean;
        templates: TemplatesRuntime<T>;
        editTags: 1 | 2 | false | null | EditTagsRuntimeSettings;
        mixMode: MixModeRuntimeSettings;
        a11y: A11yRuntimeSettings;
        autoComplete: AutoCompleteRuntimeSettings;
        classNames: ClassNameRuntimeSettings;
        dropdown: DropDownRuntimeSettings<T>;
        hooks: HooksRuntime<T>;
    }

    // Settings configuration
    interface TagifySettings<T extends BaseTagData = TagData> extends Partial<TagifyCoreSettings<T>> {
        templates?: Templates<T> | undefined;
        editTags?: 1 | 2 | false | null | EditTagsSettings | undefined;
        mixMode?: MixModeSettings | undefined;
        a11y?: A11ySettings | undefined;
        autoComplete?: AutoCompleteSettings | undefined;
        classNames?: ClassNameSettings | undefined;
        dropdown?: DropDownSettings<T> | undefined;
        hooks?: Hooks<T> | undefined;
    }

    // Generic tag format
    interface TagData extends BaseTagData {
        [key: string]: any;
    }

    // Base interface for tag data
    interface BaseTagData {
        value: string;
    }

    // Event data interfaces
    interface EventData<T extends BaseTagData = TagData> {
        tagify: Tagify<T>;
    }

    interface SingleEventData<T extends BaseTagData = TagData, S = unknown> extends EventData<T> {
        value: S;
    }

    interface TagEventData<T extends BaseTagData = TagData> extends EventData<T> {
        data?: T | undefined;
        index?: number | undefined;
        tag: HTMLElement;
    }

    interface DomEventData<T extends BaseTagData = TagData, E extends Event = Event> extends EventData<T> {
        event: E;
    }

    interface KeyboardEventData<T extends BaseTagData = TagData> extends DomEventData<T, KeyboardEvent> {}

    interface FocusChangeEventData<T extends BaseTagData = TagData> extends EventData<T> {
        relatedTarget: Element;
    }

    interface DropDownEventData<T extends BaseTagData = TagData> extends HTMLDivElement, EventData<T> {}

    interface AddEventData<T extends BaseTagData = TagData> extends TagEventData<T> {}

    interface BlurEventData<T extends BaseTagData = TagData> extends FocusChangeEventData<T> {}

    interface ChangeEventData<T extends BaseTagData = TagData> extends SingleEventData<T, string> {}

    interface ClickEventData<T extends BaseTagData = TagData> extends DomEventData<T, MouseEvent>, TagEventData<T> {
        data: T;
        index: number;
    }

    interface DoubleClickEventData<T extends BaseTagData = TagData> extends TagEventData<T> {}

    interface DropDownHideEventData<T extends BaseTagData = TagData> extends DropDownEventData<T> {}

    interface DropDownShowEventData<T extends BaseTagData = TagData> extends DropDownEventData<T> {}

    interface DropDownUpdatedEventData<T extends BaseTagData = TagData> extends DropDownEventData<T> {}

    interface DropDownNoMatchEventData<T extends BaseTagData = TagData> extends SingleEventData<T, string> {}

    interface DropDownSelectEventData<T extends BaseTagData = TagData> extends EventData<T> {
        data: T;
        elm: DomReference["dropdown"];
        event: MouseEvent | {};
    }

    interface DropDownScrollEventData<T extends BaseTagData = TagData> extends EventData<T> {
        percentage: number;
    }

    interface EditBeforeUpdateEventData<T extends BaseTagData = TagData> extends TagEventData<T> {}

    interface EditInputEventData<T extends BaseTagData = TagData> extends TagEventData<T> {
        data: T & { newValue: string };
        index: number;
        event: Event;
    }

    interface EditKeydownEventData<T extends BaseTagData = TagData> extends KeyboardEventData<T> {}

    interface EditStartEventData<T extends BaseTagData = TagData> extends TagEventData<T> {
        data: T;
        index: number;
        isValid: boolean;
    }

    interface EditUpdatedEventData<T extends BaseTagData = TagData> extends TagEventData<T> {}

    interface FocusEventData<T extends BaseTagData = TagData> extends FocusChangeEventData<T> {}

    interface InvalidTagEventData<T extends BaseTagData = TagData> extends TagEventData<T> {
        data: T;
        message: string | boolean;
    }

    interface InputEventDataNormal<T extends BaseTagData = TagData> extends EventData<T> {
        inputElm: HTMLInputElement | HTMLTextAreaElement;
        isValid: boolean | string;
        value: string;
    }

    interface InputEventDataMix<T extends BaseTagData = TagData> extends EventData<T> {
        textContent: string;
    }

    type InputEventData<T extends BaseTagData = TagData> = InputEventDataNormal<T> | InputEventDataMix<T>;

    interface KeydownEventData<T extends BaseTagData = TagData> extends KeyboardEventData<T> {}

    interface RemoveEventData<T extends BaseTagData = TagData> extends TagEventData<T> {}

    interface PasteEventData<T extends BaseTagData = TagData> extends EventData<T> {
        event: ClipboardEvent;
        pastedText: string;
        clipboardData: DataTransfer;
        tagsElems: HTMLElement[];
    }

    // Map for events and their data
    interface EventDataMap<T extends BaseTagData = TagData> {
        add: AddEventData<T>;
        blur: BlurEventData<T>;
        change: ChangeEventData<T>;
        click: ClickEventData<T>;
        dblclick: DoubleClickEventData<T>;
        "dropdown:hide": DropDownHideEventData<T>;
        "dropdown:noMatch": DropDownNoMatchEventData<T>;
        "dropdown:scroll": DropDownScrollEventData<T>;
        "dropdown:select": DropDownSelectEventData<T>;
        "dropdown:show": DropDownShowEventData<T>;
        "dropdown:updated": DropDownUpdatedEventData<T>;
        "edit:beforeUpdate": EditBeforeUpdateEventData<T>;
        "edit:input": EditInputEventData<T>;
        "edit:keydown": EditKeydownEventData<T>;
        "edit:start": EditStartEventData<T>;
        "edit:updated": EditUpdatedEventData<T>;
        focus: FocusEventData<T>;
        input: InputEventData<T>;
        invalid: InvalidTagEventData<T>;
        keydown: KeydownEventData<T>;
        remove: RemoveEventData<T>;
        paste: PasteEventData<T>;
    }

    // DOM references used by tagify
    interface DomReference {
        dropdown: HTMLDivElement;
        input: HTMLSpanElement;
        originalInput: HTMLInputElement | HTMLTextAreaElement;
        scope: HTMLElement;
    }

    // Options for removing tags
    interface RemoveAllTagsOptions {
        withoutChangeEvent?: boolean | undefined;
    }

    // Options for updating
    interface UpdateOptions {
        withoutChangeEvent?: boolean | undefined;
    }

    // React props interfaces
    type InputMode = "input" | "textarea";

    interface TagifyBaseReactProps<T extends BaseTagData = TagData> {
        autoFocus?: boolean | undefined;
        children?: string | string[] | undefined;
        className?: string | undefined;
        defaultValue?: string | string[] | T[] | undefined;
        loading?: boolean | undefined;
        name?: string | undefined;
        onAdd?: ((event: CustomEvent<AddEventData<T>>) => void) | undefined;
        onBlur?: ((event: CustomEvent<BlurEventData<T>>) => void) | undefined;
        onChange?: ((event: CustomEvent<ChangeEventData<T>>) => void) | undefined;
        onClick?: ((event: CustomEvent<ClickEventData<T>>) => void) | undefined;
        onDropdownHide?: ((event: CustomEvent<DropDownHideEventData<T>>) => void) | undefined;
        onDropdownNoMatch?: ((event: CustomEvent<DropDownNoMatchEventData<T>>) => void) | undefined;
        onDropdownScroll?: ((event: CustomEvent<DropDownScrollEventData<T>>) => void) | undefined;
        onDropdownSelect?: ((event: CustomEvent<DropDownSelectEventData<T>>) => void) | undefined;
        onDropdownShow?: ((event: CustomEvent<DropDownShowEventData<T>>) => void) | undefined;
        onDropdownUpdated?: ((event: CustomEvent<DropDownUpdatedEventData<T>>) => void) | undefined;
        onEditBeforeUpdate?: ((event: CustomEvent<EditBeforeUpdateEventData<T>>) => void) | undefined;
        onEditInput?: ((event: CustomEvent<EditInputEventData<T>>) => void) | undefined;
        onEditKeydown?: ((event: CustomEvent<EditKeydownEventData<T>>) => void) | undefined;
        onEditStart?: ((event: CustomEvent<EditStartEventData<T>>) => void) | undefined;
        onEditUpdated?: ((event: CustomEvent<EditUpdatedEventData<T>>) => void) | undefined;
        onFocus?: ((event: CustomEvent<FocusEventData<T>>) => void) | undefined;
        onInput?: ((event: CustomEvent<InputEventData<T>>) => void) | undefined;
        onInvalid?: ((event: CustomEvent<InvalidTagEventData<T>>) => void) | undefined;
        onKeydown?: ((event: CustomEvent<KeydownEventData<T>>) => void) | undefined;
        onRemove?: ((event: CustomEvent<RemoveEventData<T>>) => void) | undefined;
        placeholder?: string | undefined;
        readOnly?: boolean | undefined;
        disabled?: boolean | undefined;
        userInput?: boolean | undefined;
        settings?: TagifySettings<T> | undefined;
        showDropdown?: string | boolean | undefined;
        tagifyRef?: React.MutableRefObject<Tagify<T> | undefined> | undefined;
        value?: string | string[] | T[] | undefined;
        whitelist?: string[] | T[] | undefined;
    }

    interface TagifyTagsReactProps<T extends BaseTagData = TagData> extends TagifyBaseReactProps<T> {
        InputMode?: InputMode | undefined;
    }

    interface TagifyMixedTagsReactProps<T extends BaseTagData = TagData> extends TagifyBaseReactProps<T> {}

    function MixedTags<T extends BaseTagData = TagData>(props: TagifyMixedTagsReactProps<T>): React.ReactElement;
}

// Main Tagify class
declare class Tagify<T extends Tagify.BaseTagData = Tagify.TagData> {
    dropdown: {
        refilter(filterValue?: string): void;
        show(filterValue?: string): void;
        hide(force?: boolean): void;
        toggle(show?: boolean): void;
        selectAll(onlyRendered?: boolean): void;
    };

    settings: Tagify.TagifyRuntimeSettings<T>;
    suggestedListItems?: T[] | undefined;
    whitelist: string[] | T[];
    value: T[];
    DOM: Tagify.DomReference;
    TEXTS: Tagify.InvalidTagsMessages;

    constructor(inputElement: HTMLInputElement | HTMLTextAreaElement, settings?: Tagify.TagifySettings<T>);

    getAttributes(tagData: T): string;
    destroy(): void;
    removeAllTags(opts?: Tagify.RemoveAllTagsOptions): void;
    getCleanValue(): T[];
    update(opts?: Tagify.UpdateOptions): void;
    getInputValue(): string;
    getMixedTagsAsString(): string;
    addTags(tags: string | string[] | T[], clearInput?: boolean, skipInvalid?: boolean): HTMLElement[];
    addMixTags(tags: string | string[] | T[]): void;
    removeTags(tagElms?: HTMLElement[] | HTMLElement | string, silent?: boolean, tranDuration?: number): void;
    addEmptyTag(initialData?: Partial<T>): void;
    loadOriginalValues(value: string | string[]): void;
    getWhitelistItem(value: string, property?: keyof T, whitelist?: string[] | T[]): T[];
    isTagDuplicate(value: string | T, caseSensitive?: boolean): number | false;
    parseMixTags(value: string): string;
    getTagElms(...classes: string[]): HTMLElement[];
    getTagElmByValue(value: string): HTMLElement | undefined;
    getTagIndexByValue(value: string): number[];
    getSetTagData(tagElm: HTMLElement): T | undefined;
    getSetTagData<P extends Partial<T>>(tagElm: HTMLElement, data: P, override?: false): P | T;
    getSetTagData(tagElm: HTMLElement, data: T, override: true): T;
    editTag(tagElm?: HTMLElement): this;
    getTagTextNode(tagElm: HTMLElement): HTMLElement;
    setTagTextNode(tagElm: HTMLElement, html: string): void;
    replaceTag(tagElm: HTMLElement, tagData: T): void;
    loading(loading: boolean): this;
    tagLoading(tagElm: HTMLElement, loading: boolean): this;
    createTagElem(tagData: T): HTMLElement;
    injectAtCaret(injectedNode: string | HTMLElement, range?: Selection): this;
    placeCaretAfterNode(node: HTMLElement): void;
    insertAfterTag(tagElm: HTMLElement, newNode: string | HTMLElement): HTMLElement;
    toggleClass(className: string, force?: boolean): void;
    updateValueByDOMTags(): void;
    parseTemplate<K extends keyof Tagify.TemplatesRuntime>(
        template: K,
        data: Parameters<Exclude<Tagify.TemplatesRuntime<T>[K], null>>,
    ): HTMLElement;
    parseTemplate<Args extends any[]>(template: (...args: Args) => string, data: Args): HTMLElement;
    setReadonly(readonly: boolean): void;
    setDisabled(disabled: boolean): void;
    getPersistedData(key: string): unknown;
    setPersistedData(data: unknown, key: string): void;
    clearPersistedData(key?: string): void;
    off<K extends keyof Tagify.EventDataMap>(
        event: K,
        callback: (event: CustomEvent<Tagify.EventDataMap<T>[K]>) => void,
    ): this;
    on<K extends keyof Tagify.EventDataMap>(
        event: K,
        callback: (event: CustomEvent<Tagify.EventDataMap<T>[K]>) => void,
    ): this;
    setPlaceholder(placeholder: string): void;
    setRangeAtStartEnd(start: boolean, node: HTMLElement): void;
}

// React component
declare function Tags<T extends Tagify.BaseTagData = Tagify.TagData>(props: Tagify.TagifyTagsReactProps<T>): React.ReactElement;

// Export statements
export = Tags;
export as namespace Tagify;