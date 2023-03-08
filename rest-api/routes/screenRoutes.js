const express = require('express');
const router = express.Router();
const ScreenModel = require('../models/screenModel');

// Get Screen Middleware Function
const getScreen = async (req, res, next) => {
    try {
        const screen = await ScreenModel.findOne({
            'metadata.ID': req.params.id
        });

        if (screen == null) {
            return res.status(404).json({ message: 'Screen not found' });
        }

        res.screen = screen;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET all screens
router.get('/', async (req, res) => {
    try {
        const screens = await ScreenModel.find();
        res.json(screens);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one screen
router.get('/:id', getScreen, (req, res) => {
    res.json(res.screen);
});

// CREATE a new screen
router.post('/', async (req, res) => {
    const screen = new ScreenModel({
        metadata: req.body.metadata,
        header: req.body.header,
        elementFields: req.body.elementFields,
        bookmarkData: req.body.bookmarkData,
        content: req.body.content,
        regionContent: req.body.regionContent,
        contentContainerWidth: req.body.contentContainerWidth,
        contentStyle: req.body.contentStyle,
        contentBackgroundImage: req.body.contentBackgroundImage,
        contentBackgroundColor: req.body.contentBackgroundColor,
        bodyBackgroundImage: req.body.bodyBackgroundImage,
        bodyBackgroundColor: req.body.bodyBackgroundColor,
        footerTextColor: req.body.footerTextColor,
        hideBackToTop: req.body.hideBackToTop,
        backToTopBackgroundColor: req.body.backToTopBackgroundColor,
        backToTopTextColor: req.body.backToTopTextColor
    });

    try {
        const newScreen = await screen.save();
        res.status(201).json(newScreen);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE a screen
router.patch('/:id', getScreen, async (req, res) => {
    try {
        if (req.body.metadata != null) {
            res.screen.metadata = req.body.metadata;
        }

        if (req.body.header != null) {
            res.screen.header = req.body.header;
        }

        if (req.body.elementFields != null) {
            res.screen.elementFields = req.body.elementFields;
        }

        if (req.body.bookmarkData != null) {
            res.screen.bookmarkData = req.body.bookmarkData;
        }

        if (req.body.content != null) {
            res.screen.content = req.body.content;
        }

        if (req.body.regionContent != null) {
            res.screen.regionContent = req.body.regionContent;
        }

        if (req.body.contentContainerWidth != null) {
            res.screen.contentContainerWidth = req.body.contentContainerWidth;
        }

        if (req.body.contentStyle != null) {
            res.screen.contentStyle = req.body.contentStyle;
        }

        if (req.body.contentBackgroundImage != null) {
            res.screen.contentBackgroundImage = req.body.contentBackgroundImage;
        }

        if (req.body.contentBackgroundColor != null) {
            res.screen.contentBackgroundColor = req.body.contentBackgroundColor;
        }

        if (req.body.bodyBackgroundImage != null) {
            res.screen.bodyBackgroundImage = req.body.bodyBackgroundImage;
        }

        if (req.body.bodyBackgroundColor != null) {
            res.screen.bodyBackgroundColor = req.body.bodyBackgroundColor;
        }

        if (req.body.footerTextColor != null) {
            res.screen.footerTextColor = req.body.footerTextColor;
        }

        if (req.body.hideBackToTop != null) {
            res.screen.hideBackToTop = req.body.hideBackToTop;
        }

        if (req.body.backToTopBackgroundColor != null) {
            res.screen.backToTopBackgroundColor = req.body.backToTopBackgroundColor;
        }

        if (req.body.backToTopTextColor != null) {

            res.screen.backToTopTextColor = req.body.backToTopTextColor;
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a screen
router.delete('/:id', getScreen, async (req, res) => {
    try {
        await res.screen.remove();
        res.json({ message: 'Deleted Screen' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;