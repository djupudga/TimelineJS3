import { classMixin, unlinkify, mergeData } from "../core/Util"
import Events from "../core/Events"
import { DOMMixins } from "../dom/DOMMixins"
import * as Browser from "../core/Browser"
import { removeClass } from "../dom/DOMUtil";
import { easeInSpline } from "../animation/Ease";

export class TimeEra {
    constructor(data, options) {

        // DOM Elements
        this._el = {
            container: {},
            background: {},
            content_container: {},
            content: {},
            text: {}
        };

        // Components
        this._text = {};

        // State
        this._state = {
            loaded: false
        };


        // Data
        this.data = {
            unique_id: "",
            date: {
                year: 0,
                month: 0,
                day: 0,
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0,
                thumbnail: "",
                format: ""
            },
            text: {
                headline: "",
                text: ""
            }
        };

        // Options
        this.options = {
            duration: 1000,
            ease: easeInSpline,
            width: 600,
            height: 600,
            marker_width_min: 100 // Minimum Marker Width
        };

        // Actively Displaying
        this.active = false;

        // Animation Object
        this.animator = {};

        // End date
        this.has_end_date = false;

        // Merge Data and Options
        mergeData(this.options, options);
        mergeData(this.data, data);

        this._initLayout();
        this._initEvents();


    }

    /*	Adding, Hiding, Showing etc
    ================================================== */
    show() {

    }

    hide() {

    }

    setActive(is_active) {

    }

    addTo(container) {
        container.appendChild(this._el.container);
    }

    removeFrom(container) {
        container.removeChild(this._el.container);
    }

    updateDisplay(w, h) {
        this._updateDisplay(w, h);
    }

    getLeft() {
        return this._el.container.style.left.slice(0, -2);
    }

    getTime() {
        return this.data.start_date.getTime();
    }

    getEndTime() {

        if (this.data.end_date) {
            return this.data.end_date.getTime();
        } else {
            return false;
        }
    }

    setHeight(h) {
        var text_line_height = 12,
            text_lines = 1;

        this._el.content_container.style.height = h + "px";
        this._el.content.className = "tl-timeera-content";

        // Handle number of lines visible vertically

        if (Browser.webkit) {
            text_lines = Math.floor(h / (text_line_height + 2));
            if (text_lines < 1) {
                text_lines = 1;
            }
            this._text.className = "tl-headline";
            this._text.style.webkitLineClamp = text_lines;
        } else {
            text_lines = h / text_line_height;
            if (text_lines > 1) {
                this._text.className = "tl-headline tl-headline-fadeout";
            } else {
                this._text.className = "tl-headline";
            }
            this._text.style.height = (text_lines * text_line_height) + "px";
        }

    }

    setWidth(w) {
        if (this.data.end_date) {
            this._el.container.style.width = w + "px";

            if (w > this.options.marker_width_min) {
                this._el.content_container.style.width = w + "px";
                this._el.content_container.className = "tl-timeera-content-container tl-timeera-content-container-long";
            } else {
                this._el.content_container.style.width = this.options.marker_width_min + "px";
                this._el.content_container.className = "tl-timeera-content-container";
            }
        }

    }

    setClass(n) {
        this._el.container.className = n;
    }

    setRowPosition(n, remainder) {
        this.setPosition({ top: n });

        if (remainder < 56) {
            removeClass(this._el.content_container, "tl-timeera-content-container-small");
        }
    }

    setColor(color_num) {
        this._el.container.className = 'tl-timeera tl-timeera-color' + color_num;
    }

    /*	Events
    ================================================== */


    /*	Private Methods
    ================================================== */
    _initLayout() {
        // Create Layout
        this._el.container = this.domCreate("div", "tl-timeera");
        if (this.data.unique_id) {
            this._el.container.id = this.data.unique_id + "-era";
        }

        if (this.data.end_date) {
            this.has_end_date = true;
            this._el.container.className = 'tl-timeera tl-timeera-with-end';
        }

        this._el.content_container = this.domCreate("div", "tl-timeera-content-container", this._el.container);

        this._el.background = this.domCreate("div", "tl-timeera-background", this._el.content_container);

        this._el.content = this.domCreate("div", "tl-timeera-content", this._el.content_container);



        // Text
        this._el.text = this.domCreate("div", "tl-timeera-text", this._el.content);
        this._text = this.domCreate("h2", "tl-headline", this._el.text);
        if (this.data.text.headline && this.data.text.headline != "") {
            this._text.innerHTML = unlinkify(this.data.text.headline);
        }



        // Fire event that the slide is loaded
        this.onLoaded();

    }

    _initEvents() {

    }

    // Update Display
    _updateDisplay(width, height, layout) {

        if (width) {
            this.options.width = width;
        }

        if (height) {
            this.options.height = height;
        }

    }

}

classMixin(TimeEra, Events, DOMMixins)