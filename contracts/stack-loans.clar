(define-data-var stx-deposit int 0)
;;Lockup-period only valid for 3 months.
(define-data-var lockup-period int 3)
(define-data-var stx-return int 0)


(define-public (get-stx-return (stx int))
    (ok
        (begin 
            (var-set stx-deposit stx)
            ;;(var-set lockup-period months)
            ;;Lockup-period selection NOT WORKING.
            ;;(get-lockup-period)
            (var-set stx-return (- (+ (* (/ (* (var-get stx-deposit) 5) 100) (var-get lockup-period)) (var-get stx-deposit)) 5))
            (print (var-get stx-return)))))


;;(define-public (get-lockup-period (months int))
;;    (ok 
;;        (begin
;;            (var-set lockup-period months))))