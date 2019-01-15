class Main extends PIXI.Application {

  public constructor() {

      let view = document.querySelector("#canvasContainer canvas") as HTMLCanvasElement;

      super({ view: view, backgroundColor: 0xb5b5b5, antialias: true, forceCanvas:false });

      /**global settings */
      fgui.UIConfig.defaultFont = "Microsoft YaHei";
      fgui.UIConfig.verticalScrollBar = "ui://test/ScrollBar_VT";
      fgui.UIConfig.horizontalScrollBar = "ui://test/ScrollBar_HZ";
      fgui.UIConfig.popupMenu = "ui://test/PopupMenu";
      fgui.UIConfig.globalModalWaiting = "ui://test/GlobalModalWaiting";
      fgui.UIConfig.windowModalWaiting = "ui://test/WindowModalWaiting";

      //main entry
      fgui.GRoot.inst.attachTo(this, {
          designWidth: 1136,
          designHeight: 640,
          scaleMode: fgui.StageScaleMode.FIXED_AUTO,
          orientation: fgui.StageOrientation.LANDSCAPE,
          alignV: fgui.StageAlign.TOP,
          alignH: fgui.StageAlign.LEFT
      });

      //start to preload resource
      //test.jpg actually is a binary file but just ends with fake postfix. so here we need to specify the loadType etc.
      let loader = new fgui.utils.AssetLoader();
      loader.add("test", "images/test.jpg", { loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR, xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER })
          .add("test@atlas0", "images/test@atlas0.png")
          .add("test@atlas0_1", "images/test@atlas0_1.png")
          .add("test@atlas0_2", "images/test@atlas0_2.png")
          .on("progress", this.loadProgress, this)
          .on("complete", this.resLoaded, this)
          .load();
  }

  private loadProgress(loader: PIXI.loaders.Loader): void {
      let p = loader.progress;
      //this.loadingView.setProgress(p);
      if (p >= 100) {
          loader.off("progress", this.loadProgress, this);
          //this.loadingView.dispose();
          //this.loadingView = null;
      }
  }

  private resLoaded(loader: PIXI.loaders.Loader): void {
      loader.removeAllListeners();

      fgui.UIPackage.addPackage("test");  //add your package built in the editor
      
      let ins = fgui.UIPackage.createObject("test", "main") as fgui.GComponent;   //create an object to display
      ins.setSize(fgui.GRoot.inst.width, fgui.GRoot.inst.height);     //add relation so that it will be auto resized when the window size is changed.
      ins.addRelation(fgui.GRoot.inst, fgui.RelationType.Size);
      fgui.GRoot.inst.addChild(ins);   //show it
  }