import React, { useEffect, useState, Fragment } from 'react'
import Quagga from 'quagga'
import { Modal } from 'react-bootstrap'
import "../../components/assets/style.css"

export default function Scanner({ show, onDetected, handleScanner }) {
    useEffect(() => {
        Quagga.init(
            {
                inputStream: {
                    type: 'LiveStream',
                    constraints: {
                          width: 250,
                          height: 200,
                        facingMode: 'environment', // or user
                    },
                },
                locator: {
                    patchSize: 'medium',
                    halfSample: true,
                },
                numOfWorkers: 4,
                decoder: {
                    readers: ['code_128_reader', 'ean_reader', 'upc_reader','ean_8_reader','code_39_reader','codabar_reader','code_93_reader'],
                },
                locate: true,
            },
            function (err) {
                if (err) {
                    return console.log(err)
                }
                Quagga.start()
            },
        )
        Quagga.onDetected(handleDetected)
        return function cleanup() {
            Quagga.offDetected(onDetected)
            Quagga.stop()
        }
    }, [])
    const handleDetected = (result) => {
        onDetected(result)
    }
    return (
        <Modal size="lg" show={show} onHide={(e)=>handleScanner(false)} backdrop="static" keyboard={false} centered>
            <Modal.Header closeButton>
                <Modal.Title id="searchResTitle">Scan barcode</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id="interactive" className="viewport">

                </div>
            </Modal.Body>

        </Modal>

    )
}
