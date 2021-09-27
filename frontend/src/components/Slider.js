import React from 'react'

const Slider = () => {
    return (
        <div id="sliderControls" className="carousel slide" >
            <div className="carousel-inner">
                <ol className="carousel-indicators">
                    <li data-target="#sliderControls" data-slide-to="0" class="active"></li>
                    <li data-target="#sliderControls" data-slide-to="1"></li>
                    {/* <li data-target="#sliderControls" data-slide-to="2"></li> */}
                </ol>
                <div className="carousel-item active">
                    <div className="image-slider d-flex align-items-center justify-content-center">
                        <img className="d-block  "
                            // style={{ width: "20%", height: "auto" }}
                            src="/uploads/image-1621849118815-removebg-preview.png" />
                        <div className="m-4" >
                            <a className="text-decoration-none" style={{ color: "white", fontSize: "2rem" }} href="#">Samsung Galaxy S21</a>
                            <br />
                            <span style={{ color: "white", fontSize: "1rem" }}>Màn hình giải trí lớn</span>
                        </div>
                    </div>
                    {/* <img className="d-block w-100 " src="/uploads/image-1623151007699.jpg" /> */}
                </div>
                <div className="carousel-item">
                    <div className="image-slider d-flex align-items-center justify-content-center">
                        <img className="d-block  "
                            // style={{ width: "20%", height: "auto" }}
                            src="/uploads/image-1621849111495-removebg-preview.png" />
                        <div className="m-4" >
                            <a className="text-decoration-none" style={{ color: "white", fontSize: "2rem" }} href="#">Samsung Galaxy S21</a>
                            <br />
                            <span style={{ color: "white", fontSize: "1rem" }}>Chuẩn chống nước IP68</span>
                        </div>
                    </div>
                </div>
                {/* <div className="carousel-item">
                    <div className="image-slider">

                    </div>
                </div> */}
            </div>
            {/* <a className="carousel-control-prev" href="#sliderControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#sliderControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a> */}
        </div>
    )
}
export default Slider